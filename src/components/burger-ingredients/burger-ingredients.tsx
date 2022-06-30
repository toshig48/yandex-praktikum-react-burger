import { useRef, useState, useEffect, useMemo, memo, MutableRefObject, SyntheticEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { TBurger } from '../../services/type';
import { CustomizedState } from '../../services/interface';

import { showModal } from '../../services/slices';
import { setCurentIngredient, unSetCurentIngredient } from '../../services/slices';
import { INGREDIENT_BUN, INGREDIENT_SAUCE, INGREDIENT_MAIN, FLAG_INGRIDIENT_SHOW_MODAL } from '../../services/utils/config';

import styles from './burger-ingredients.module.css';

interface IBurgerIngredientGroupsProps {
  text: string;
  tilteRef: MutableRefObject<HTMLParagraphElement>;
  data: Array<TBurger>;
  burgerConstructorData: Array<TBurger>;
};

const BurgerIngredientGroups: FC<IBurgerIngredientGroupsProps> = (props) => {
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
  const navigate = useNavigate();
  const state = useLocation().state as CustomizedState;
  const data = useSelector((state: any) => state.allIngredients.items) as Array<TBurger>;
  const burgerConstructorData = useSelector((state: any) => state.selectedIngredients.items) as Array<TBurger>;
  const flagClear = useSelector((state: any) => state.curentIngredient.flagClear) as boolean;
  const curentIngredient = useSelector((state: any) => state.curentIngredient.item) as TBurger;
  const isShowModal = useSelector((state: any) => state.modal.isShowModal) as boolean;

  const flagIngridientShowModal = localStorage.getItem(FLAG_INGRIDIENT_SHOW_MODAL);

  const bunRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;
  const sauceRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;
  const mainRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;

  const [startShowModal, setStartShowModal] = useState(false)
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

  // Если есть флаг очистки выбранного элемента flagClear - очищаем выбранный элемент в редьюсере (при показе страницы ingredients):
  useEffect(
    () => {
      if (flagClear) {
        dispatch(unSetCurentIngredient());
      }
    },
    [flagClear, dispatch]
  );

  // При закрытии модального окна с информацией об ингридиенте - очищаем выбранный элемент в редьюсере:
  useEffect(
    () => {
      if (curentIngredient && startShowModal && !isShowModal) {
        setStartShowModal(false);
        localStorage.removeItem(FLAG_INGRIDIENT_SHOW_MODAL);
        dispatch(unSetCurentIngredient());
        navigate(-1);
      }
    },
    [curentIngredient, startShowModal, setStartShowModal, isShowModal, navigate, dispatch]
  );

  // Открываем модальное окно с информацией об ингридиенте при установке выбранного элемента в редьюсере:
  useEffect(
    () => {
      if (curentIngredient && flagIngridientShowModal) {
        dispatch(showModal({
          title: "Детали ингредиента",
          content: <IngredientDetails />
        }));
        setStartShowModal(true);
      }
    },
    [curentIngredient, flagIngridientShowModal, dispatch]
  );

  // Если есть ID выбранного индридиента(при первоначальной загрузке страницы) - фиксируем это в редьюсере:
  useEffect(
    () => {
      if (data.length > 0 && state?.ingredientId !== undefined) {
        dispatch(setCurentIngredient(data.filter(x => x._id === state?.ingredientId)[0]));
      }
    },
    [state, data, dispatch]
  );

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    switch (tab) {
      case INGREDIENT_BUN.key:
        {
          if (bunRef.current) {
            bunRef.current.scrollIntoView({ behavior: "smooth" });
          }
          break;
        }
      case INGREDIENT_SAUCE.key:
        {
          if (sauceRef.current) {
            sauceRef.current!.scrollIntoView({ behavior: "smooth" });
          }
          break;
        }
      case INGREDIENT_MAIN.key:
        {
          if (mainRef.current) {
            mainRef.current!.scrollIntoView({ behavior: "smooth" });
          }
          break;
        }
      default: { break; }
    }
  }

  const handleScroll = (e: SyntheticEvent) => {
    const y = e.currentTarget.getBoundingClientRect().y + 50;
    const sauceY = mainRef.current!.getBoundingClientRect().y;
    const mainY = sauceRef.current!.getBoundingClientRect().y;
    sauceY < y ? setCurrentTab(INGREDIENT_MAIN.key) : mainY < y ? setCurrentTab(INGREDIENT_SAUCE.key) : setCurrentTab(INGREDIENT_BUN.key);
  }

  return (
    <>
      {data.length === 0 ?
        <h1 className={styles.message}>Не получены данные от API</h1>
        :
        <>
          <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
          <div className={styles.tabs}>
            <Tab active={currentTab === INGREDIENT_BUN.key} value={INGREDIENT_BUN.key} onClick={handleTabClick}>
              {INGREDIENT_BUN.name}
            </Tab>
            <Tab active={currentTab === INGREDIENT_SAUCE.key} value={INGREDIENT_SAUCE.key} onClick={handleTabClick}>
              {INGREDIENT_SAUCE.name}
            </Tab>
            <Tab active={currentTab === INGREDIENT_MAIN.key} value={INGREDIENT_MAIN.key} onClick={handleTabClick}>
              {INGREDIENT_MAIN.name}
            </Tab>
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
