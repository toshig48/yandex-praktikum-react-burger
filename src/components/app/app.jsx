import {useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import {urlApi} from '../../utils/config.js';

const App = () => { 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setData([]);
        await fetch(urlApi)
          .then((response) => {
            if (!response.ok) 
            {
              throw new Error("Запрос вернул status = " + response.status);
            } 
            else 
            {
              return response.json();
            }
          })
          .then((data) => {
            if(data.success)
             {
               setData(data.data);
               setError(null);
             }
             else
             {
               throw new Error("Json API вернул success != true");
             }
          })
          .finally( () => {             
              setLoading(false);
            }
          )
          .catch( (ex) =>
          {
            setError(ex.message);
            console.error(ex);
          });
      }
      getData();
  }, [])
  
  if(loading)
  {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Загрузка данных...</p> 
    );
  }

  if(error)
  {
    return (
      <p className={`${styles.message} red text text_type_main-medium`}>Ошибка при загрузки данных: {error}</p> 
    );
  }
  
  return (
    <>
    { data.length == 0 ?
        <h1 className={styles.message}>Не получены данные от API</h1>
        :
        <div className={styles.app}>
          <AppHeader />      
          <div className={styles.flex}>
            <div className={`${styles.flex_item} pr-5`}>
              <BurgerIngredients data={data} />
            </div>
            <div className={`${styles.flex_item__burger_constructor} pl-5`}>
              <BurgerConstructor data={data} />
            </div>
          </div>
        </div>
    }
    </>
  );
}

export default App;
