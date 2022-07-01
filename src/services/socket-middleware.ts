import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { wsAllOrdersInit, wsUserOrdersInit } from "./slices";
import { getAuthToken } from "./utils/token";

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
    return (store) => {
        let socket: WebSocket;
        return (next) => (action: PayloadAction<any>) => {
            const dispatch = store.dispatch;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            if (type === wsInit) {
                switch (type) {
                    case wsUserOrdersInit.type:
                        {
                            const token = getAuthToken();
                            if (token) {
                                socket = new WebSocket(`${wsUrl}?token=${token}`);
                            }
                            break;
                        }
                    case wsAllOrdersInit.type:
                        {
                            socket = new WebSocket(`${wsUrl}/all`);
                            break;
                        }
                }
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            }
            next(action);
        }
    }
}