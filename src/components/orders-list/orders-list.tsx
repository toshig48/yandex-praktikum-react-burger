import { FC, memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/dispatch';
import Order from '../order/order';
import { TBurger, TWSOrder } from '../../services/types';

import styles from './orders-list.module.css';

type TOrdersListProps = {
  orders: Array<TWSOrder>;
  isShowStatus: boolean;
};

const OrdersList: FC<TOrdersListProps> = (props) => {
  const burgerConstructorData = useAppSelector(state => state.allIngredients.items) as Array<TBurger>;
  const className = useMemo(
    () => props.isShowStatus ? styles.my_orders : styles.all_orders,
    [props.isShowStatus]
  );
  return (
    <ul className={`${className} ${styles.list} custom_scroll`} >
      {
        props.orders.map((item, index: number) => (
          <Order key={index} item={item} index={index} allIngredients={burgerConstructorData} isShowStatus={props.isShowStatus} />
        ))
      }
    </ul>
  );
}

export default memo(OrdersList);