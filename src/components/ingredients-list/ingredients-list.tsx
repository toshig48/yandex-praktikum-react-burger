import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, memo, useMemo } from 'react';
import { TBurger, TBurgerGroupById } from '../../services/types';
import { groupIngredientsById } from '../../services/utils/func';
import CircleImage from '../circle-image/circle-image';

import styles from './ingredients-list.module.css';

interface IngredientsListItemProps {
  data: TBurgerGroupById;
};

const IngredientsListItem: FC<IngredientsListItemProps> = (props) => {
  const data = props.data;
  const ingredient = props.data.item;
  return (
    <li className={`${styles.item} mb-4`}>
      <div className='d_flex_vertical_center'>
        <CircleImage data={ingredient} zIndex={0} ingredientsCountPlus={0} />
        <span className="text text_type_main ml-4">{ingredient.name}</span>
      </div>
      <span className={`${styles.price} ml-4 mr-6`}>
        <span className="text text_type_digits-medium mr-1">
          {`${data.count} x ${ingredient.price}`}
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
  const itemByGroup: Array<TBurgerGroupById> = useMemo(
    () => groupIngredientsById(props.ingredients),
    [props.ingredients]
  );

  return (
    <>itemByGroup &&
      <ul className={`${styles.list} custom_scroll`} >
        {
          itemByGroup.map((item, index: number) => (
            <IngredientsListItem key={index} data={item} />
          ))
        }
      </ul>
    </>
  );
}

export default memo(IngredientsList);

