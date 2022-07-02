import { FC, memo } from 'react';
import { useAppSelector } from '../../hooks/dispatch';

import styles from './ingredient-details.module.css';

interface IIngredientCompositionProps {
  title: string;
  text: string;
};

const IngredientComposition: FC<IIngredientCompositionProps> = (props) => {
  return (
    <div className='mr-5 secondary'>
      <p className="text text_type_main-default">{props.title} </p>
      <p className="text text_type_digits-default mt-3">{props.text} </p>
    </div>
  );
}

const IngredientDetails: FC = () => {
  const data = useAppSelector(state => state.curentIngredient.item);

  if (!data) {
    return (
      <p>
        Нет такого ингридиента
      </p>
    );
  }

  return (
    <>
      <img className={styles.img} src={data.image} alt={data.name}></img>
      <p className="text text_type_main-medium mt-4 mb-8">{data.name} </p>
      <div className={styles.compositions}>
        <IngredientComposition title="Калории,ккал" text={`${data.calories}`} />
        <IngredientComposition title="Белки, г" text={`${data.proteins}`} />
        <IngredientComposition title="Жиры, г" text={`${data.fat}`} />
        <IngredientComposition title="Углеводы, г" text={`${data.carbohydrates}`} />
      </div>
    </>
  );
}

export default memo(IngredientDetails);

