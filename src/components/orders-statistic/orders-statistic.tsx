import { FC, memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/dispatch';

import styles from './orders-statistic.module.css';
import OrdersNumberList from '../orders-number-list/orders-number-list';
import { Status } from '../../services/constant';

const OrdersStatistic: FC = () => {
  const orders = useAppSelector(state => state.wsAllOrders.orders);
  const ordersDone = useMemo(
    () => orders?.orders.filter(function (a) { return a.status === Status.DONE; }).map(function (x) { return x.number; }),
    [orders]
  );
  const ordersPending = useMemo(
    () => orders?.orders.filter(function (a) { return a.status === Status.PENDING; }).map(function (x) { return x.number; }),
    [orders]
  );
  return (
    <div className='ml-15'>
      <div className={styles.flex}>
        <OrdersNumberList title='Готовы' ordersId={ordersDone} isDone={true} />
        <OrdersNumberList title='В работе' ordersId={ordersPending} isDone={false} />
      </div>
      {orders && <>
        <p className='text text_type_main-medium mt-10'>Выполнено за все время:</p>
        <p className='order_number_shadow text text_type_digits-large'>{orders?.total} </p>
        <p className='text text_type_main-medium mt-10'>Выполнено за сегодня:</p>
        <p className='order_number_shadow text text_type_digits-large'>{orders?.totalToday} </p>
      </>
      }
    </div>
  );
}

export default memo(OrdersStatistic);