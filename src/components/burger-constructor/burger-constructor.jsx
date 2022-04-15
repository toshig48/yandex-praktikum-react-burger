import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {bun, burgerPropTypes} from '../../utils/data.js';

const BurgerConstructor = (props) =>  {  
  let bunElements = props.data.filter(x => x.type === bun.key);
  let firstElement = undefined, lastElement = undefined;
  if(bunElements.length === 2)
  {
    firstElement = bunElements[0];
    lastElement = bunElements[1];
  }

  const handleClose = () => {
  }

  return (
    <>
      {firstElement &&
      <div className="pl-8 ml-4 mr-4">
        <ConstructorElement               
              key={firstElement._id} 
              price={firstElement.price} 
              text={firstElement.name + ' (верх)'} 
              thumbnail={firstElement.image} 
              handleClose={handleClose} 
              isLocked={true} 
              type='top'/>
      </div>
      } 
      <ul className={`${styles.list} ml-4 mt-4 mb-4 custom_scroll`} >
        {
        props.data.filter(x => x.type !== bun.key).map(item => (
          <li className={`${styles.item} mb-4 mr-2`}  key={item._id}>
            <DragIcon/>
            <i className='ml-2'/>
            <ConstructorElement 
              key={item._id} 
              price={item.price} 
              text={item.name} 
              thumbnail={item.image} 
              handleClose={handleClose} 
              isLocked={false}/>
          </li>
          ))
        }
      </ul>
      {lastElement &&
      <div className="pl-8 ml-4 mr-4">
        <ConstructorElement 
              key={lastElement._id} 
              price={lastElement.price} 
              text={lastElement.name + ' (низ)'} 
              thumbnail={lastElement.image} 
              handleClose={handleClose} 
              isLocked={true} 
              type='bottom'/>
      </div>
      }
      <div className={`${styles.bottom} mt-10 mb-2 mr-6`}>
        <span className="mr-5">
        <span className="text text_type_digits-medium mr-1">
          {props.data.reduce((partialSum, a) => partialSum + a.price, 0)}
          </span>
          <CurrencyIcon/>
        </span>
        
        <Button type="primary" size="medium">Оформить заказ</Button>
      </div>
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes)
};

