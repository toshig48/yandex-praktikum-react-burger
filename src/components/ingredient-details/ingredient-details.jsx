import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';
import {burgerPropTypes} from '../../utils/config.js';

const IngredientComposition = (props) =>
{  
  return (
    <div className='mr-5 secondary'> 
      <p className="text text_type_main-default">{props.title} </p>
      <p className="text text_type_main-default">{props.text} </p>
    </div>
  );
}

const IngredientDetails = (props) =>
{ 
  return (
    <>
    {
      <Modal header="Детали ингредиента" isShowModal={props.isShowModal} toggleShowModal={props.toggleShowModal}> 
        <img className={styles.img} src={props.data.image}></img>
        <p className="text text_type_main-medium mt-4 mb-8">{props.data.name} </p>
        <div className={styles.compositions}>
          <IngredientComposition title="Калории,ккал" text={props.data.calories}/>
          <IngredientComposition title="Белки, г" text={props.data.proteins}/>
          <IngredientComposition title="Жиры, г" text={props.data.fat}/>
          <IngredientComposition title="Углеводы, г" text={props.data.carbohydrates}/>
        </div>
    </Modal>
    }
    </>    
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
  data: burgerPropTypes.isRequired
};
