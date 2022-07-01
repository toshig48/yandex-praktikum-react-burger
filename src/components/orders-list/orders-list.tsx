import { memo } from 'react';

import { useAppSelector } from '../../hooks/dispatch';

import styles from './orders-list.module.css';
import Order from '../order/order';
import { TBurger } from '../../services/types';

const OrdersList = () => {
  const orders = useAppSelector(state => state.wsAllOrders.orders);
  const burgerConstructorData = useAppSelector(state => state.allIngredients.items) as Array<TBurger>;
  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <ul className={`${styles.list} custom_scroll`} >
        {
          orders?.orders.map((item, index: number) => (
            <Order key={index} item={item} index={index} allIngredients={burgerConstructorData} />
          ))
        }
      </ul>
    </>
  );
}

export default memo(OrdersList);