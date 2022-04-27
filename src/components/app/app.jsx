import { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { useModal } from '../../hooks/use-modal';
import Modal from '../modal/modal';
import { getIngredientsData } from '../../utils/burger-api'
import { BurgerConstructorContext, TotalPriceContext, OrderNumberContext } from '../../services/burger-constructor-context';

const totalPriceInitialState = { totalPrice: 0 };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case "set":
      return { totalPrice: action.payload };
    case "reset":
      return { totalPrice: totalPriceInitialState };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [data, setData] = useState([]);
  const [burgerConstructorData, setBurgerConstructorData] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isShowModal, toggleShowModal] = useModal();
  const [paramModal, setParamModal] = useState({
    title: '',
    content: null
  });

  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setData([]);

      await getIngredientsData()
        .then((data) => {
          setData(data);
          setBurgerConstructorData(data);
          setError(null);
        })
        .finally(() => {
          setLoading(false);
        }
        ).
        catch((ex) => {
          setError(ex.message);
          console.error(ex);
        });
    }

    getData();
  }, [])

  if (loading) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Загрузка данных...</p>
    );
  }

  if (error) {
    return (
      <p className={`${styles.message} red text text_type_main-medium`}>Ошибка при загрузки данных: {error}</p>
    );
  }

  return (
    <>
      {data.length == 0 ?
        <h1 className={styles.message}>Не получены данные от API</h1>
        :
        <div className={styles.app}>
          <AppHeader />
          <div className={styles.flex}>
            <div className={`${styles.flex_item} pr-5`}>
              <BurgerIngredients data={data} setParamModal={setParamModal} toggleShowModal={toggleShowModal} />
            </div>
            <div className={`${styles.flex_item__burger_constructor} pl-5`}>
              <BurgerConstructorContext.Provider value={{ burgerConstructorData }}>
                <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
                  <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
                    <BurgerConstructor setParamModal={setParamModal} toggleShowModal={toggleShowModal} />
                  </OrderNumberContext.Provider>
                </TotalPriceContext.Provider>
              </BurgerConstructorContext.Provider>
            </div>
          </div>
        </div>
      }
      {
        isShowModal &&
        <Modal header={paramModal.title} toggleShowModal={toggleShowModal}>
          {paramModal.content}
        </Modal>
      }
    </>
  );
}

export default App;
