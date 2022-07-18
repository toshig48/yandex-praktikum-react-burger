import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';

import styles from './orders-user.module.css';
import OrdersList from '../orders-list/orders-list';
import { showModal, wsUserOrdersConnectionClosed, wsUserOrdersInit } from '../../services/slices';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CustomizedState } from '../../services/interfaces';
import { OrderDetailPage } from '../../pages';

const OrdersUser: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const state = location.state as CustomizedState;
  const { orders, error, isConnected } = useAppSelector(state => state.wsUserOrders);

  // Закрываем веб-сокет при покидании страницы:
  useEffect(() => {
    return () => { dispatch(wsUserOrdersConnectionClosed()); }
  }, [dispatch]);

  // Если веб-сокет списка всех заказов не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnected) {
      dispatch(wsUserOrdersInit());
    }
  }, [dispatch, isConnected]);

  // Вызываем модальное окно при наличии ошибки:
  useEffect(
    () => {
      if (error) {
        dispatch(showModal({
          title: "",
          isNavigateGoBack: false,
          content: `Ошибка при получении данных от WS: ${error}`
        }));
      }
    },
    [error, dispatch]
  );

  return (
    <Routes location={state?.pathnameModal !== undefined ? state?.pathnameModal : location.pathname}>
      <Route path='/' element={
        <div className={`${styles.div_orders_user} mt-10`}>
          <OrdersList orders={orders?.orders} isShowStatus={true} />
        </div >} />
      <Route path='/:id' element={<OrderDetailPage orders={orders?.orders} />} />
    </Routes>
  );
}

export default memo(OrdersUser);