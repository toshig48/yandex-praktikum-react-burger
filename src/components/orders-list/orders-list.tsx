import { FC, memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/dispatch';
import Order from '../order/order';
import { TBurger, TWSOrder } from '../../services/types';

import styles from './orders-list.module.css';

type TOrdersListProps = {
  orders: Array<TWSOrder> | undefined;
  isShowStatus: boolean;
};

const OrdersList: FC<TOrdersListProps> = (props) => {
  const { orders, isShowStatus } = props;
  const burgerConstructorData = useAppSelector(state => state.allIngredients.items) as Array<TBurger>;
  const className = useMemo(
    () => isShowStatus ? styles.my_orders : styles.all_orders,
    [isShowStatus]
  );
  return (
    <>
      {
        orders ?
          <ul className={`${className} ${styles.list} custom_scroll`} >
            {
              orders?.map((item, index: number) => (
                <Order key={index} item={item} index={index} allIngredients={burgerConstructorData} isShowStatus={isShowStatus} />
              ))
            }
          </ul>
          :
          <p className='mt-20 text_center'>Ожидание загрузки списка заказов...</p>
      }
    </>
  );
}

export default memo(OrdersList);