import { FC, memo, useMemo } from "react";
import { TBurger, TWSOrder } from '../../services/types';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


import styles from "./order.module.css";
import React from "react";
import { getStatus } from "../../services/utils/func";
import { Status } from "../../services/constant";
import { Link, useLocation } from "react-router-dom";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch } from "../../hooks/dispatch";
import { showModal } from "../../services/slices";
import CircleImage from "../circle-image/circle-image";

interface IOrder {
    item: TWSOrder;
    index: number;
    allIngredients: Array<TBurger>;
    isShowStatus: boolean;
};

const Order: FC<IOrder> = (props) => {
    const dispatch = useAppDispatch();

    const { item, index, allIngredients } = props;

    const pathname = useLocation().pathname;

    const ingredients = useMemo(
        () => allIngredients.filter(function (a) {
            return item.ingredients.indexOf(a._id) !== -1;
        }),
        [item, allIngredients]
    );

    const totalPrice = useMemo(
        () => ingredients.reduce((partialSum: number, a: TBurger) => partialSum + a.price, 0),
        [ingredients]
    );

    const ingredients_count = useMemo(
        () => ingredients.length,
        [ingredients]
    );

    const handleOpenModal = () => {
        dispatch(showModal({
            title: "",
            isNavigateGoBack: true,
            content: <OrderDetails item={item} />
        }));
    }
    return (
        <li className={`${styles.item} mb-4 mr-2 p-4`} key={index} onClick={handleOpenModal}>
            <Link to={`${item._id}`} state={{ pathnameModal: pathname, orderID: item._id }}>
                <div className={`${styles.div_flex}`}>
                    <span className="text text_type_digits-default">#{item.number}</span>
                    <span className="secondary text text_type_main-default">{`${item.dateBeautifulString}`}</span>
                </div>
                <p className="text text_type_main-medium mt-6">{item.name}</p>
                {props.isShowStatus && <p className={item.status === Status.DONE ? 'status_done' : ''}>{getStatus(item.status)}</p>}
                <div className={`${styles.div_flex} mt-6`}>
                    <span>
                        {
                            ingredients.map((data, index: number) => (
                                index < 5 || ingredients_count === 6 ?
                                    <CircleImage key={index} zIndex={ingredients_count - index} data={data} ingredientsCountPlus={0} />
                                    :
                                    index === 5 && ingredients_count > 6 ?
                                        <CircleImage key={index} zIndex={ingredients_count - index} data={data} ingredientsCountPlus={ingredients_count - 6} />
                                        :
                                        <React.Fragment key={index}></React.Fragment>
                            ))
                        }
                    </span>
                    <span className={`${styles.price} mt-5`}>
                        <span className="text text_type_digits-default mr-1">
                            {`${totalPrice}`}
                        </span>
                        <CurrencyIcon type={"primary"} />
                    </span>
                </div>
            </Link>
        </li >
    );
}

export default memo(Order);

