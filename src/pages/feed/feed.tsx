import { FC, memo, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { OrderDetailPage } from '..';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatistic from '../../components/orders-statistic/orders-statistic';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { CustomizedState } from '../../services/interfaces';
import { wsAllOrdersInit, wsAllOrdersConnectionClosed, showModal } from '../../services/slices';

import styles from './feed.module.css';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const state = location.state as CustomizedState;
  const { orders, error, isConnected } = useAppSelector(state => state.wsAllOrders);
  const isShowModal = useAppSelector(state => state.modal.isShowModal);

  // Закрываем веб-сокет при покидании страницы:
  useEffect(() => {
    return () => { dispatch(wsAllOrdersConnectionClosed()); }
  }, [dispatch])

  // Если веб-сокет списка всех заказов не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnected) {
      dispatch(wsAllOrdersInit());
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
    <Routes location={state?.pathnameModal !== undefined && isShowModal ? state?.pathnameModal : location.pathname}>
      <Route path='/' element={
        <>
          <div className={`${styles.flex_item}`}>
            <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
            {<OrdersList orders={orders?.orders} isShowStatus={false} />}
          </div>
          {
            orders &&
            <div className={`${styles.flex_item__statistic}`}>
              <OrdersStatistic />
            </div>
          }
        </>} />
      <Route path='/:id' element={<OrderDetailPage orders={orders?.orders} />} />
    </Routes>
  );
}

export default memo(FeedPage);
