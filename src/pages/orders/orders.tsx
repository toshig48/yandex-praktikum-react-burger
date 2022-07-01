import { memo } from 'react';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatistic from '../../components/orders-statistic/orders-statistic';

import styles from './orders.module.css';

const Orders = () => {

  return (
    <>
      <div className={`${styles.flex_item}`}>
        <OrdersList />
      </div>
      <div className={`${styles.flex_item__statistic}`}>
        <OrdersStatistic />
      </div>
    </>
  );
}

export default memo(Orders);
