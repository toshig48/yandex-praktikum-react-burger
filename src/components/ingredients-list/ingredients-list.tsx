import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, memo } from 'react';
import { TBurger } from '../../services/types';
import CircleImage from '../circle-image/circle-image';

import styles from './ingredients-list.module.css';

interface IngredientsListItemProps {
  ingredient: TBurger;
};

const IngredientsListItem: FC<IngredientsListItemProps> = (props) => {
  const { ingredient } = props;
  return (
    <li className={`${styles.item} mb-4`}>
      <div className='d_flex_vertical_center'>
        <CircleImage data={ingredient} zIndex={0} ingredientsCountPlus={0} />
        <span className="text text_type_main ml-4">{ingredient.name}</span>
      </div>
      <span className="ml-4 mr-6">
        <span className="text text_type_digits-medium mr-1">
          {ingredient.price}
        </span>
        <CurrencyIcon type={"primary"} />
      </span>
    </li>
  );
}
memo(IngredientsListItem);

interface IngredientsListProps {
  ingredients: Array<TBurger>;
};

const IngredientsList: FC<IngredientsListProps> = (props) => {
  return (
    <ul className={`${styles.list} custom_scroll`} >
      {
        props.ingredients.map((item, index: number) => (
          <IngredientsListItem key={index} ingredient={item} />
        ))
      }
    </ul>
  );
}

export default memo(IngredientsList);

