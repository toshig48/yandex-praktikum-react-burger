import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { setCurentIngredient } from '../../services/slices';
import { FLAG_INGRIDIENT_SHOW_MODAL } from '../../services/utils/config';

import styles from './burger-ingredient.module.css';
import { TBurger } from '../../services/type';

interface IBurgerIngredientProps {
  item: TBurger;
  count: number;
};

const BurgerIngredient: FC<IBurgerIngredientProps> = (props) => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const { item, count } = props;

  const handleOpenModal = () => {
    dispatch(setCurentIngredient(item));
    localStorage.setItem(FLAG_INGRIDIENT_SHOW_MODAL, "true");
  }

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li className={`${styles.item} mb-8`} data-id={item._id} onClick={handleOpenModal} style={{ opacity }}>
      <Link to={`ingredients/${item._id}`} state={{ pathnameModal: pathname, ingredientId: item._id }}>
        <div ref={ref}>
          <img src={item.image} className='ml-4 mr-4' alt={item.name}></img>
          <p className="text text_type_digits-default mb-1 mt-1">
            <span className="mr-2">
              {item.price}
            </span>
            <CurrencyIcon type={'primary'} />
          </p>
          <p className="text text_type_main-default">{item.name} </p>
        </div>
        {
          count > 0 &&
          <div className={styles.counter}>
            <Counter count={count} size="default" />
          </div>
        }
      </Link>
    </li>
  )
}

export default memo(BurgerIngredient);
