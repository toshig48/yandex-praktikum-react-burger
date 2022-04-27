import { useState, useEffect, useContext, useMemo, memo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_BUN } from "../../utils/config.js";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext, TotalPriceContext, OrderNumberContext } from "../../services/burger-constructor-context";
import { createOrder } from '../../utils/burger-api'

const FilledBunElement = (props) => {
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

const EmptyBunElement = (props) => {
  let className = props.position === "top" ? "constructor-element_pos_top" : "constructor-element_pos_bottom";
  return (
    <div className="pl-8 ml-4 mr-4">
      <div className={`${styles.empty_bun_element} ${className}`}>
        <p>Выберите булку</p>
      </div>
    </div>
  );
}

const BunElement = ({ data, position }) => {
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

const BurgerConstructor = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { burgerConstructorData } = useContext(BurgerConstructorContext);
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { orderNumber, setOrderNumber } = useContext(OrderNumberContext);

  const bunIngredient = useMemo(
    () => burgerConstructorData.filter(x => x.type === INGREDIENT_BUN.key)[0],
    [burgerConstructorData]
  );

  const noBunIngredients = useMemo(
    () => burgerConstructorData.filter(x => x.type !== INGREDIENT_BUN.key),
    [burgerConstructorData]
  );

  const CreateOrderApi = async (data) => {
    setLoading(true);
    setError(null);
    await createOrder(data)
      .then(setOrderNumber)
      .finally(() => {
        setLoading(false);
      })
      .catch((ex) => {
        setError(ex.message);
        console.error(ex);
      });
  }

  const handleOpenModal = async () => {
    await CreateOrderApi(burgerConstructorData.map(item => item._id));
  }

  useEffect(
    () => {
      if (error) {
        props.setParamModal({
          title: "",
          content: `Ошибка при создании заказа: ${error}`
        });
        props.toggleShowModal();
      }
    },
    [error]
  );

  useEffect(
    () => {
      if (orderNumber > 0) {
        props.setParamModal({
          title: "",
          content: <OrderDetails orderNumber={orderNumber} />
        });
        props.toggleShowModal();
      }
    },
    [orderNumber]
  );

  useEffect(
    () => {
      if (burgerConstructorData.length > 0) {
        totalPriceDispatcher({
          type: 'set',
          payload: burgerConstructorData.filter(x => x.type !== INGREDIENT_BUN.key).reduce((partialSum, a) => partialSum + a.price, 0) + bunIngredient.price * 2
        });
      }
    },
    [burgerConstructorData]
  );

  return (
    <>
      <BunElement data={bunIngredient} position="top" />
      <ul className={`${styles.list} ml-4 mt-4 mb-4 custom_scroll`} >
        {
          noBunIngredients.map((item, index) => (
            <li className={`${styles.item} mb-4 mr-2`} key={index}>
              <DragIcon />
              <i className="ml-2" />
              <ConstructorElement
                price={item.price}
                text={item.name}
                thumbnail={item.image}
                isLocked={false} />
            </li>
          ))
        }
      </ul>
      <BunElement data={bunIngredient} position="bottom" />
      <div className={`${styles.bottom} mt-10 mb-2 mr-6`}>
        <span className="mr-5">
          <span className="text text_type_digits-medium mr-1">
            {totalPriceState.totalPrice}
          </span>
          <CurrencyIcon />
        </span>
        <Button type="primary" size="medium" onClick={handleOpenModal} disabled={(burgerConstructorData.length === 0 || loading) ? true : false}>
          {loading ? "Ожидание..." : "Оформить заказ"}
        </Button>
      </div>
    </>
  );
}

export default memo(BurgerConstructor);

BurgerConstructor.propTypes = {
  setParamModal: PropTypes.func.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
};

