import { memo } from 'react';
import styles from './ingredient-details.module.css';
import { burgerPropTypes } from '../../utils/prop-types.js';

const IngredientComposition = (props) =>
{  
  return (
    <div className='mr-5 secondary'> 
      <p className="text text_type_main-default">{props.title} </p>
      <p className="text text_type_digits-default mt-3">{props.text} </p>
    </div>
  );
}

const IngredientDetails = (props) =>
{ 
  return (
    <>
        <img className={styles.img} src={props.data.image}></img>
        <p className="text text_type_main-medium mt-4 mb-8">{props.data.name} </p>
        <div className={styles.compositions}>
          <IngredientComposition title="Калории,ккал" text={props.data.calories}/>
          <IngredientComposition title="Белки, г" text={props.data.proteins}/>
          <IngredientComposition title="Жиры, г" text={props.data.fat}/>
          <IngredientComposition title="Углеводы, г" text={props.data.carbohydrates}/>
        </div>
    </>    
  );
}

export default memo(IngredientDetails);

IngredientDetails.propTypes = {
  data: burgerPropTypes.isRequired
};
