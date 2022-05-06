import { useRef, useState, useMemo, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import { INGREDIENT_BUN, INGREDIENT_SAUCE, INGREDIENT_MAIN } from '../../utils/config.js';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { fetchAllIngredients } from '../../services/thunks';
import { showModal } from '../../services/slices';

const BurgerIngredientGroups = (props) => {
  return (
    <section >
      <p className="text text_type_main-medium pb-6" ref={props.tilteRef}>{props.text}</p>
      <ul className='pl-4 pb-2'>
        {props.data.map((item) => (<BurgerIngredient key={item._id} item={item} count={props.burgerConstructorData.filter(data => data._id === item._id).length} />))
        }
      </ul>
    </section>
  )
}

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.allIngredients.items);
  const burgerConstructorData = useSelector(state => state.selectedIngredients.items);
  const { loading, error } = useSelector(state => state.allIngredients);

  useEffect(() => {
    if (!loading && data.length === 0) {
      dispatch(fetchAllIngredients());
    }
  }, [])

  useEffect(
    () => {
      if (error) {
        dispatch(showModal({
          title: "",
          content: `Ошибка при получении данных от API: ${error}`
        }));
      }
    },
    [error]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(INGREDIENT_BUN.key)

  const buns = useMemo(
    () => data.filter(x => x.type === INGREDIENT_BUN.key),
    [data]
  );
  const sauces = useMemo(
    () => data.filter(x => x.type === INGREDIENT_SAUCE.key),
    [data]
  );
  const mains = useMemo(
    () => data.filter(x => x.type === INGREDIENT_MAIN.key),
    [data]
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
      default: { break; }
    }
  }

  const handleScroll = (e) => {
    const y = e.currentTarget.getBoundingClientRect().y + 50;
    const sauceY = mainRef.current.getBoundingClientRect().y;
    const mainY = sauceRef.current.getBoundingClientRect().y;
    sauceY < y ? setCurrentTab(INGREDIENT_MAIN.key) : mainY < y ? setCurrentTab(INGREDIENT_SAUCE.key) : setCurrentTab(INGREDIENT_BUN.key);
  }

  if (loading) {
    return (
      <p className={`${styles.message} text text_type_main-medium mt-10`}>Загрузка данных...</p>
    );
  }

  return (
    <>
      {data.length === 0 ?
        <h1 className={styles.message}>Не получены данные от API</h1>
        :
        <>
          <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
          <div className={styles.tabs}>
            <Tab active={currentTab === INGREDIENT_BUN.key} value={INGREDIENT_BUN.key} onClick={handleTabClick}>{INGREDIENT_BUN.name}</Tab>
            <Tab active={currentTab === INGREDIENT_SAUCE.key} value={INGREDIENT_SAUCE.key} onClick={handleTabClick}>{INGREDIENT_SAUCE.name}</Tab>
            <Tab active={currentTab === INGREDIENT_MAIN.key} value={INGREDIENT_MAIN.key} onClick={handleTabClick}>{INGREDIENT_MAIN.name}</Tab>
          </div>
          <div className={`${styles.group_list} custom_scroll mt-10`} onScroll={handleScroll}>
            <BurgerIngredientGroups tilteRef={bunRef} text={INGREDIENT_BUN.name} data={buns} burgerConstructorData={burgerConstructorData} />
            <BurgerIngredientGroups tilteRef={sauceRef} text={INGREDIENT_SAUCE.name} data={sauces} burgerConstructorData={burgerConstructorData} />
            <BurgerIngredientGroups tilteRef={mainRef} text={INGREDIENT_MAIN.name} data={mains} burgerConstructorData={burgerConstructorData} />
          </div>
        </>
      }
    </>
  );
}

export default memo(BurgerIngredients);
