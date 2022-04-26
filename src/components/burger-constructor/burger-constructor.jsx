import { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { URL_API, INGREDIENT_BUN } from "../../utils/config.js";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext, TotalPriceContext, OrderNumbereContext } from "../../services/burger-constructor-context";

const BunElement = (props) => {
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

const BurgerConstructor = (props) => {
  const { burgerConstructorData } = useContext(BurgerConstructorContext);
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { orderNumber, setOrderNumber } = useContext(OrderNumbereContext);

  const bunElement = useMemo(
    () => burgerConstructorData.filter(x => x.type === INGREDIENT_BUN.key)[0],
    [burgerConstructorData]
  );

  const noBunElements = useMemo(
    () => burgerConstructorData.filter(x => x.type !== INGREDIENT_BUN.key),
    [burgerConstructorData]
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CreateOrderApi = async (data) => {
    setLoading(true);
    setError(null);
    await fetch(URL_API + "/orders", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": data
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Запрос вернул status = " + response.status);
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.success) {
          setOrderNumber(data.order.number)
          setError(null);
        }
        else {
          throw new Error("Json API вернул success != true");
        }
      })
      .finally(() => {
        setLoading(false);
      }
      )
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
      totalPriceDispatcher({
        type: 'set',
        payload: burgerConstructorData.filter(x => x.type !== INGREDIENT_BUN.key).reduce((partialSum, a) => partialSum + a.price, 0) + bunElement.price * 2
      });
    },
    [burgerConstructorData]
  );

  return (
    <>
      {
        bunElement ?
          <BunElement price={bunElement.price} name={bunElement.name} image={bunElement.image} position="top" />
          :
          <EmptyBunElement position="top" />
      }
      <ul className={`${styles.list} ml-4 mt-4 mb-4 custom_scroll`} >
        {
          noBunElements.map((item, index) => (
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
      {
        bunElement ?
          <BunElement price={bunElement.price} name={bunElement.name} image={bunElement.image} position="bottom" />
          :
          <EmptyBunElement position="bottom" />
      }
      <div className={`${styles.bottom} mt-10 mb-2 mr-6`}>
        <span className="mr-5">
          <span className="text text_type_digits-medium mr-1">
            {totalPriceState.totalPrice}
          </span>
          <CurrencyIcon />
        </span>
        <Button type="primary" size="medium" onClick={handleOpenModal} disabled={loading ? true : false}>{loading ? "Ожидание..." : "Оформить заказ"}</Button>
      </div>
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  setParamModal: PropTypes.func.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
};

