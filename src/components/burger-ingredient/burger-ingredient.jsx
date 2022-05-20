import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerPropTypes } from '../../utils/prop-types.js';
import styles from './burger-ingredient.module.css';


import IngredientDetails from '../ingredient-details/ingredient-details';
import { setCurentIngredient, showModal } from '../../services/slices';

const BurgerIngredient = (props) => {
  const dispatch = useDispatch();

  const { item, count } = props;

  const handleOpenModal = () => {
    dispatch(setCurentIngredient(item));    
    dispatch(showModal({
      title: "Детали ингредиента",
      content: <IngredientDetails />
    }));
  }

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li  className={`${styles.item} mb-8`} data-id={item._id} onClick={handleOpenModal} style={{ opacity }}>
      <div ref={ref}>
        <img src={item.image} className='ml-4 mr-4' alt={item.name}></img>
        <p className="text text_type_digits-default mb-1 mt-1">
          <span className="mr-2">
            {item.price}
          </span>
          <CurrencyIcon />
        </p>
        <p className="text text_type_main-default">{item.name} </p>
      </div>
      {
        count > 0 &&
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      }
    </li>
  )
}

export default memo(BurgerIngredient);

BurgerIngredient.propTypes = {
  item : burgerPropTypes.isRequired,  
  count : PropTypes.number.isRequired
};
