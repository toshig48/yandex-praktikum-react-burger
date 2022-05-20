import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

const IngredientComposition = (props) => {
  return (
    <div className='mr-5 secondary'>
      <p className="text text_type_main-default">{props.title} </p>
      <p className="text text_type_digits-default mt-3">{props.text} </p>
    </div>
  );
}

const IngredientDetails = () => {
  const data = useSelector(state => state.curentIngredient);
  return (
    <>
      <img className={styles.img} src={data.image} alt={data.name}></img>
      <p className="text text_type_main-medium mt-4 mb-8">{data.name} </p>
      <div className={styles.compositions}>
        <IngredientComposition title="Калории,ккал" text={data.calories} />
        <IngredientComposition title="Белки, г" text={data.proteins} />
        <IngredientComposition title="Жиры, г" text={data.fat} />
        <IngredientComposition title="Углеводы, г" text={data.carbohydrates} />
      </div>
    </>
  );
}

export default memo(IngredientDetails);

