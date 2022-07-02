import { FC, memo, useEffect } from 'react';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatistic from '../../components/orders-statistic/orders-statistic';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { wsAllOrdersInit, wsAllOrdersConnectionClosed } from '../../services/slices';

import styles from './feed.module.css';

const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const isConnectedWSAllOrders = useAppSelector((state) => state.wsAllOrders.isConnected);
  const orders = useAppSelector(state => state.wsAllOrders.orders);
  // Закрываем веб-сокет при покидании страницы:
  useEffect(() => {
    return () => { dispatch(wsAllOrdersConnectionClosed()); }
  }, [dispatch])

  // Если веб-сокет списка всех заказов не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnectedWSAllOrders) {
      dispatch(wsAllOrdersInit());
    }
  }, [dispatch, isConnectedWSAllOrders])

  return (
    <>
      <div className={`${styles.flex_item}`}>
        <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
        {orders && <OrdersList orders={orders.orders} isShowStatus={false} />}
      </div>
      <div className={`${styles.flex_item__statistic}`}>
        <OrdersStatistic />
      </div>
    </>
  );
}

export default memo(Orders);
