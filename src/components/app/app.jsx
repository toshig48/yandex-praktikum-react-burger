import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import Modal from '../modal/modal';

const App = () => {
  const { isShowModal } = useSelector(state => state.modal);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.flex}>
            <div className={`${styles.flex_item} pr-5`}>
              <BurgerIngredients />
            </div>
            <div className={`${styles.flex_item__burger_constructor} pl-5`}>
              <BurgerConstructor />
            </div>
          </div>
        </DndProvider>
      </div>
      {
        isShowModal &&
        <Modal />
      }
    </>
  );
}

export default App;
