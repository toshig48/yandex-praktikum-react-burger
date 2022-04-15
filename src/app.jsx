import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import {myData} from './utils/data.js';

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />      
      <div className={styles.flex}>
        <div className={`${styles.flex_item} pr-5`}>
          <BurgerIngredients data={myData} />
        </div>
        <div className={`${styles.flex_item__burger_constructor} pl-5`}>
          <BurgerConstructor data={myData} />
        </div>
      </div>
    </div>
  );
}

export default App;
