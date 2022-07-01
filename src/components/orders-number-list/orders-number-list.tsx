import { memo, useMemo } from 'react';

import styles from './orders-number-list.module.css';

type TModalOverlayProps = {
  title: string;
  ordersId: Array<number> | undefined;
  isDone: boolean;
};

const OrdersNumberList = (props: TModalOverlayProps) => {
  const className = useMemo(
    () => props.isDone ? styles.order_num : '',
    [props.isDone]
  );
  return (
    <div className={styles.flex_item}>
      <p className="text text_type_main-medium mb-4">{props.title}:</p>
      <ul className={styles.order_list}>
        {props.ordersId && props.ordersId.map((data) =>
          <li key={data} className={`${className} text text_type_digits mb-1 mr-2`}>{data}</li>)}
      </ul>
    </div>
  );
}

export default memo(OrdersNumberList);