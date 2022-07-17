import { FC, memo, useMemo } from 'react';

import styles from './orders-number-list.module.css';

type TOrdersNumberListProps = {
  title: string;
  ordersId: Array<number> | undefined;
  isDone: boolean;
};

const OrdersNumberList: FC<TOrdersNumberListProps> = (props) => {
  const className = useMemo(
    () => props.isDone ? 'status_done' : '',
    [props.isDone]
  );
  return (
    <div>
      <p className="text text_type_main-medium mb-4">{props.title}:</p>
      <ul className={styles.order_list}>
        {props.ordersId && props.ordersId.map((data) =>
          <li key={data} className={`${className} text text_type_digits mb-1 mr-2`}>{data}</li>)}
      </ul>
    </div>
  );
}

export default memo(OrdersNumberList);