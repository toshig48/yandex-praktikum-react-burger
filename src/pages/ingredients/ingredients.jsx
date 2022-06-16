import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import { setCurentIngredient, setFlagClear } from '../../services/slices';
import { FLAG_INGRIDIENT_SHOW_MODAL } from '../../utils/config';

import styles from './ingredients.module.css';
const IngredientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(state => state.allIngredients.items);
  const curentIngredient = useSelector(state => state.curentIngredient.item);
  const { id } = useParams();
  const flagIngridientModal = localStorage.getItem(FLAG_INGRIDIENT_SHOW_MODAL);

  useEffect(
    () => {
      if (data.length > 0 && !curentIngredient) {
        dispatch(setCurentIngredient(data.filter(x => x._id === id)[0]));
        if (flagIngridientModal) {
          navigate("/");
        }
        else {
          dispatch(setFlagClear());
        }
      }
    },
    [id, data, curentIngredient, flagIngridientModal, navigate, dispatch]
  );

  return (
    <div className={styles.main}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <IngredientDetails />
    </div>
  );
}

export default memo(IngredientsPage);
