import { memo, } from 'react';
import styles from './home.module.css';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

const HomePage = () => {

  return (
    <>
      <div className={`${styles.flex_item} pr-5`}>
        <BurgerIngredients />
      </div>
      <div className={`${styles.flex_item__burger_constructor} pl-5`}>
        <BurgerConstructor />
      </div>
    </>
  );
}

export default memo(HomePage);
