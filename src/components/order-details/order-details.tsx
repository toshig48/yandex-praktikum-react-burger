import { FC, memo, useMemo } from 'react';

import { useAppSelector } from '../../hooks/dispatch';

import { TBurger, TWSOrder } from '../../services/types';
import { Status } from '../../services/constant';
import { getStatus } from '../../services/utils/func';
import IngredientsList from '../ingredients-list/ingredients-list';


import styles from './order-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderDetails {
  item?: TWSOrder | null;
};

const OrderDetails: FC<IOrderDetails> = (props) => {
  const item = props.item;
  const allIngredients = useAppSelector(state => state.allIngredients.items) as Array<TBurger>;
  const ingredients = useMemo(
    () => allIngredients.filter(function (a) {
      return item?.ingredients.indexOf(a._id) !== -1;
    }),
    [item, allIngredients]
  );

  const totalPrice = useMemo(
    () => ingredients.reduce((partialSum: number, a: TBurger) => partialSum + a.price, 0),
    [ingredients]
  );

  return (
    <>
      {item &&
        <div className={styles.main_div}>
          <p className={`text text_type_digits-default ${styles.number}`}>#{item.number} </p>
          <p className="text text_type_main-medium mt-10 mb-3">{item.name}</p>
          <p className={item.status === Status.DONE ? 'status_done' : ''}>{getStatus(item.status)}</p>
          <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
          <IngredientsList ingredients={ingredients} />
          <div className="d_flex_space_between mt-10">
            <span className="secondary text text_type_main-default">{`${item.dateBeautifulString}`}</span>
            <span className="ml-4">
              <span className="text text_type_digits-medium mr-1">
                {totalPrice}
              </span>
              <CurrencyIcon type={"primary"} />
            </span>
          </div>
        </div>
      }
    </>
  );
}

export default memo(OrderDetails);