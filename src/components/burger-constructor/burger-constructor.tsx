import { useEffect, useMemo, memo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import NoBunElement from "../no-bun-element/no-bun-element";

import { INGREDIENT_BUN } from "../../services/utils/config";
import { addIngredient, showModal } from '../../services/slices';
import { TBurger, TPosition } from '../../services/type';
import { fetchCreateOrder } from '../../services/thunks/index';

import styles from "./burger-constructor.module.css";

type TFilledBunElementProps = {
  position: TPosition;
  name: string;
  price: number;
  image: string;
};

const FilledBunElement = (props: TFilledBunElementProps) => {
  let text = "";
  let classDiv = "";
  if (props.position === "top") {
    text = "(верх)";
  }
  else {
    text = "(низ)";
    classDiv = styles.rotate_180;
  }

  return (
    <div className={`pl-8 ml-4 mr-4 ${classDiv}`}>
      <ConstructorElement
        price={props.price}
        text={`${props.name} ${text}`}
        thumbnail={props.image}
        isLocked={true}
        type={props.position} />
    </div>
  );
}

type TEmptyBunElementProps = {
  position: TPosition;
};

const EmptyBunElement = (props: TEmptyBunElementProps) => {
  let className = props.position === "top" ? "constructor-element_pos_top" : "constructor-element_pos_bottom";
  return (
    <div className="pl-8 ml-4 mr-4">
      <div className={`${styles.empty_bun_element} ${className}`}>
        <p>Выберите булку</p>
      </div>
    </div>
  );
}

type TBunElementProps = {
  position: TPosition;
  data: TBurger;
};

const BunElement = ({ data, position }: TBunElementProps) => {
  return (
    <>
      {
        data ?
          <FilledBunElement price={data.price} name={data.name} image={data.image} position={position} />
          :
          <EmptyBunElement position={position} />
      }
    </>
  );
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const moveItem = (item: TBurger) => {
    dispatch(addIngredient({ ...item, key: uuidv4() }));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TBurger) {
      moveItem(item)
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const burgerConstructorData = useSelector((state: any) => state.selectedIngredients.items) as Array<TBurger>;
  const { loading, order, error } = useSelector((state: any) => state.order);

  const bunIngredient = useMemo(
    () => burgerConstructorData.filter(x => x.type === INGREDIENT_BUN.key)[0],
    [burgerConstructorData]
  );

  const noBunIngredients = useMemo(
    () => burgerConstructorData.filter(x => x.type !== INGREDIENT_BUN.key),
    [burgerConstructorData]
  );

  const totalPrice = useMemo(
    () => burgerConstructorData.reduce((partialSum: number, a: TBurger) => partialSum + a.price, 0),
    [burgerConstructorData]
  );

  const [showModalFlag, setShowModalFlag] = useState(false);

  const handleCreateOrder = async () => {
    if (loggedIn) {
      dispatch(fetchCreateOrder(burgerConstructorData.map(item => item._id)) as any);
      setShowModalFlag(true);
    }
    else {
      navigate("/login");
    }
  }

  useEffect(
    () => {
      if (error) {
        dispatch(showModal({
          title: "",
          content: `Ошибка при создании заказа: ${error}`
        }));
      }
    },
    [error, dispatch]
  );

  useEffect(
    () => {
      if (order.number > 0 && showModalFlag) {
        setShowModalFlag(false);
        dispatch(showModal({
          title: "",
          content: <OrderDetails />
        }));
      }
    },
    [order, showModalFlag, dispatch]
  );

  return (
    <>
      <div ref={dropTarget} className={isHover ? styles.onHover : ''}>
        <BunElement data={bunIngredient} position="top" />
        <ul className={`${styles.list} ml-4 mt-4 mb-4 custom_scroll`} >
          {
            noBunIngredients.map((item, index: number) => (
              <NoBunElement key={item.key} item={item} index={index} />
            ))
          }
        </ul>
        <BunElement data={bunIngredient} position="bottom" />
      </div>
      <div className={`${styles.bottom} mt-10 mb-2 mr-6`}>
        <span className="mr-5">
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type={"primary"} />
        </span>
        <Button type="primary" size="medium" onClick={handleCreateOrder} disabled={(burgerConstructorData.length === 0 || loading) ? true : false}>
          {loading ? "Ожидание..." : "Оформить заказ"}
        </Button>
      </div>
    </>
  );
}

export default memo(BurgerConstructor);