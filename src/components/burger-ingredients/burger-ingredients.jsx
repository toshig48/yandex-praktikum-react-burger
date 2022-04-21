import {useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {bun, sauce, main, burgerPropTypes} from '../../utils/config.js';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useModal} from '../../hooks/use-modal';

const BurgerIngredientGroups = (props) =>
 {
  return(
    <section>
      <p className="text text_type_main-medium pb-6">{props.text}</p>
      <ul className='pl-4 pb-2'>
      {props.data.map((item, index) => (
          <li className={`${styles.item} mb-8`} key={item._id} data-id={item._id} onClick={props.handleOpenModal}>
            <img src={item.image} className='ml-4 mr-4'></img>
            <p className="text text_type_digits-default mb-1 mt-1">
              <span className="mr-2">
              {item.price}
              </span>
              <CurrencyIcon />
            </p>
            <p className="text text_type_main-default">{item.name} </p>
            {
              index === 1 &&
                <div className={styles.counter}>
                  <Counter count={1} size="default" />
                </div>
            }       
          </li>
          ))
      }
      </ul>
    </section>
  )
}

const BurgerIngredients = (props) =>
 {
  const [isShowModal, toggleShowModal] = useModal();
  const [currentTab, setCurrentTab] = useState(bun.key)
  const [selectItem, setSelectItem] = useState(null);
  
  const handleOpenModal = (e) => {
    let id = e.currentTarget.getAttribute('data-id');
    setSelectItem(props.data.filter(x => x._id === id)[0]);
    toggleShowModal();
  }
  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p> 
      <div className={styles.tabs}>
        <Tab active={currentTab === bun.key} value={bun.key} onClick={setCurrentTab}>{bun.name}</Tab>
        <Tab active={currentTab === sauce.key} value={sauce.key} onClick={setCurrentTab}>{sauce.name}</Tab>
        <Tab active={currentTab === main.key} value={main.key} onClick={setCurrentTab}>{main.name}</Tab>
      </div>
      <div className={`${styles.group_list} custom_scroll mt-10`}>
        <BurgerIngredientGroups key={bun.key} text={bun.name} data={props.data.filter(x => x.type === bun.key)} handleOpenModal={handleOpenModal}/>
        <BurgerIngredientGroups key={sauce.key} text={sauce.name} data={props.data.filter(x => x.type === sauce.key)} handleOpenModal={handleOpenModal}/>
        <BurgerIngredientGroups key={main.key} text={main.name} data={props.data.filter(x => x.type === main.key)} handleOpenModal={handleOpenModal}/>
      </div>
      {
        isShowModal &&
          <IngredientDetails data={selectItem} isShowModal={isShowModal} toggleShowModal={toggleShowModal}/>
      }
    </>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes)
};
