import { memo } from 'react';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/dispatch';

import image1 from '../../images/order/vector-1.svg'
import image2 from '../../images/order/vector-2.svg'
import image3 from '../../images/order/vector-3.svg'
import styles from './order-details.module.css';

const OrderDetails = () => {
  const orderNumber = useAppSelector(state => state.order.order?.number);
  return (
    <>
      <p className='order_number_shadow text text_type_digits-large mt-20'>{orderNumber} </p>
      <p className="text text_type_main-medium mt-8 mb-15">Идентификатор заказа</p>
      <div className={styles.wrapper_check_mark_icon}>
        <CheckMarkIcon type={'primary'} />
        <img src={image3} className={styles.img_3} alt='image3' />
        <img src={image2} className={styles.img_2} alt='image2' />
        <img src={image1} className={styles.img_1} alt='image1' />
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default secondary mt-2 mb-20">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

export default memo(OrderDetails);