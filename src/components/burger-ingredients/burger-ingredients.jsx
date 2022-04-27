import { useRef, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_BUN, INGREDIENT_SAUCE, INGREDIENT_MAIN } from '../../utils/config.js';
import { burgerPropTypes } from '../../utils/prop-types.js';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredientGroups = (props) => {
  return (
    <section>
      <p className="text text_type_main-medium pb-6" ref={props.tilteRef}>{props.text}</p>
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

const BurgerIngredients = (props) => {
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(INGREDIENT_BUN.key)

  const buns = useMemo(
    () => props.data.filter(x => x.type === INGREDIENT_BUN.key),
    [props.data]
  );
  const sauces = useMemo(
    () => props.data.filter(x => x.type === INGREDIENT_SAUCE.key),
    [props.data]
  );
  const mains = useMemo(
    () => props.data.filter(x => x.type === INGREDIENT_MAIN.key),
    [props.data]
  );

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case INGREDIENT_BUN.key:
        {
          bunRef.current.scrollIntoView({ behavior: "smooth" });
          break;
        }
      case INGREDIENT_SAUCE.key:
        {
          sauceRef.current.scrollIntoView({ behavior: "smooth" });
          break;
        }
      case INGREDIENT_MAIN.key:
        {
          mainRef.current.scrollIntoView({ behavior: "smooth" });
          break;
        }
    }
  }

  const handleOpenModal = (e) => {
    let id = e.currentTarget.getAttribute('data-id');

    props.setParamModal({
      title: "Детали ингредиента",
      content: <IngredientDetails data={props.data.filter(x => x._id === id)[0]} />
    });
    props.toggleShowModal();
  }

  return (
    <>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab active={currentTab === INGREDIENT_BUN.key} value={INGREDIENT_BUN.key} onClick={handleTabClick}>{INGREDIENT_BUN.name}</Tab>
        <Tab active={currentTab === INGREDIENT_SAUCE.key} value={INGREDIENT_SAUCE.key} onClick={handleTabClick}>{INGREDIENT_SAUCE.name}</Tab>
        <Tab active={currentTab === INGREDIENT_MAIN.key} value={INGREDIENT_MAIN.key} onClick={handleTabClick}>{INGREDIENT_MAIN.name}</Tab>
      </div>
      <div className={`${styles.group_list} custom_scroll mt-10`}>
        <BurgerIngredientGroups tilteRef={bunRef} text={INGREDIENT_BUN.name} data={buns} handleOpenModal={handleOpenModal} />
        <BurgerIngredientGroups tilteRef={sauceRef} text={INGREDIENT_SAUCE.name} data={sauces} handleOpenModal={handleOpenModal} />
        <BurgerIngredientGroups tilteRef={mainRef} text={INGREDIENT_MAIN.name} data={mains} handleOpenModal={handleOpenModal} />
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes),
  setParamModal: PropTypes.func.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
};

export default memo(BurgerIngredients);
