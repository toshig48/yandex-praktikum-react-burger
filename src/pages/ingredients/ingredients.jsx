import { memo, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ingredients.module.css';
import { useParams } from 'react-router-dom';
import { setCurentIngredient, setFlagClear } from '../../services/slices';
import { HomePage } from '../index';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientsPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.allIngredients.items);
  const curentIngredient = useSelector(state => state.curentIngredient.item);
  const { id } = useParams();
  const flagIngridientModal = localStorage.getItem('flagIngridientModal');

  useEffect(
    () => {
      if (data && !curentIngredient) {
        dispatch(setCurentIngredient(data.filter(x => x._id === id)[0]));
        if(!flagIngridientModal)
        {
          dispatch(setFlagClear());
        }
      }
    },
    [id, data, curentIngredient, flagIngridientModal, dispatch]
  );
  
  if(flagIngridientModal)
  {   
    return (
      <HomePage />
    );    
  }

  return (
    <div className={styles.main}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <IngredientDetails />
    </div>
  );
}

export default memo(IngredientsPage);
