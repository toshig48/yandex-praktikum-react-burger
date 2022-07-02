import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';

import styles from './orders-user.module.css';
import OrdersList from '../orders-list/orders-list';
import { wsUserOrdersConnectionClosed, wsUserOrdersInit } from '../../services/slices';

const OrdersUser: FC = () => {
  const dispatch = useAppDispatch();
  const isConnectedWSAllOrders = useAppSelector((state) => state.wsUserOrders.isConnected);
  const orders = useAppSelector(state => state.wsUserOrders.orders);
  // Закрываем веб-сокет при покидании страницы:
  useEffect(() => {
    return () => { dispatch(wsUserOrdersConnectionClosed()); }
  }, [dispatch])

  // Если веб-сокет списка всех заказов не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnectedWSAllOrders) {
      dispatch(wsUserOrdersInit());
    }
  }, [dispatch, isConnectedWSAllOrders])
  return (
    orders &&
    <div className={`${styles.div_orders_user} mt-10`}>
      <OrdersList orders={orders?.orders} isShowStatus={true} />
    </div >
  );
}

export default memo(OrdersUser);