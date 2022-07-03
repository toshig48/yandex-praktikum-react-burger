import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/order-details/order-details';
import { TWSOrder } from '../../services/types';

import styles from './order-detail.module.css';

type TOrderDetailPageProps = {
  orders: Array<TWSOrder> | undefined;
};

const OrderDetailPage: FC<TOrderDetailPageProps> = (props) => {
  const urlParams = useParams();
  const orderId = urlParams.id;
  const orders = props.orders;
  const orderForDetail: TWSOrder | null = useMemo(
    () => orders && orderId !== undefined ? orders.find(item => item._id == orderId) as TWSOrder : null,
    [orders, orderId]
  );
  return (
    <>
      {
        orderForDetail &&
        <div className={styles.main_div}>
          <div className={`${styles.div_order_detail} mt-10`}>
            <OrderDetails item={orderForDetail} />
          </div>
        </div>
      }
    </>
  );
}

export default memo(OrderDetailPage);
