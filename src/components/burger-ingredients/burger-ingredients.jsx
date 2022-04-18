import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {bun, sauce, main, burgerPropTypes} from '../../utils/data.js';

const BurgerIngredientGroups = (props) =>
 {
  return(
    <>
      <p className="text text_type_main-medium pb-6">{props.text}</p>
      <ul className={`${styles.list} pl-4 pb-2`}>
      {props.data.map(item => (
          <li className={`${styles.item} mb-8`} key={item._id}>
            <img src={item.image} className='ml-4 mr-4'></img>
            <p className="text text_type_digits-default mb-1 mt-1">
              <span className="mr-2">
              {item.price}
              </span>
              <CurrencyIcon />
            </p>
            <p className="text text_type_main-default">{item.name} </p>
            {
              item._id === '60666c42cc7b410027a1a9b1' &&
                <div className={styles.counter}>
                  <Counter count={1} size="default" />
                </div>
            }       
          </li>
          ))
      }
      </ul>
    </>
  )
}
const BurgerIngredients = (props) =>
 {
  const handleTab = (x) => {
    
  }
  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab active={true} value={bun.key} onClick={handleTab(bun.key)}>{bun.name}</Tab>
        <Tab active={false} value={sauce.key} onClick={handleTab(sauce.key)}>{sauce.name}</Tab>
        <Tab active={false} value={main.key} onClick={handleTab(main.key)}>{main.name}</Tab>
      </div>
      <div className={`${styles.groupList} custom_scroll mt-10`}>
        <BurgerIngredientGroups key={bun.key} text={bun.name} data={props.data.filter(x => x.type === bun.key)}/>
        <BurgerIngredientGroups key={sauce.key} text={sauce.name} data={props.data.filter(x => x.type === sauce.key)}/>
        <BurgerIngredientGroups key={main.key} text={main.name} data={props.data.filter(x => x.type === main.key)}/>
      </div>
    </>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes)
};
