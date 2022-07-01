import { FC, memo, useMemo } from "react";
import { TBurger, TWSOrder } from '../../services/types';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


import styles from "./order.module.css";
import React from "react";

interface IOrder {
    item: TWSOrder;
    index: number;
    allIngredients: Array<TBurger>;
};

const Order: FC<IOrder> = (props) => {
    const { item, index, allIngredients } = props;
    const totalPrice = useMemo(
        () => item.ingredients.reduce((partialSum: number, a: string) => partialSum + allIngredients.filter(x => x._id === a)[0].price, 0),
        [item, allIngredients]
    );

    const ingredients = useMemo(
        () => allIngredients.filter(function (a) {
            return item.ingredients.indexOf(a._id) !== -1;
        }),
        [item, allIngredients]
    );

    const ingredients_count = useMemo(
        () => ingredients.length,
        [ingredients]
    );
    return (
        <li className={`${styles.item} mb-4 mr-2 p-4`} key={index}>
            <div className={`${styles.div_flex}`}>
                <span className="text text_type_digits-default">#{item.number}</span>
                <span className="secondary text text_type_main-default">{`${item.dateBeautifulString}`}</span>
            </div>
            <p className="text text_type_main-medium mt-6 mb-6">{item.name}</p>
            <div className={styles.div_flex}>
                <span>
                    {
                        ingredients.map((data, index: number) => (
                            index < 5 || ingredients_count === 6 ?
                                <div key={index} className={styles.img_circle} style={{ 'zIndex': ingredients_count - index }}>
                                    <img src={data.image} alt={data.name} ></img>
                                </div> :
                                index === 5 && ingredients_count > 6 ?
                                    <div key={index} className={styles.img_circle} style={{ 'zIndex': ingredients_count - index }}>
                                        <img className={styles.img_blackout} src={data.image} alt={data.name} ></img>
                                        <span>+{ingredients_count - 6}</span>
                                    </div> : <React.Fragment key={index}></React.Fragment>
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
        </li >
    );
}

export default memo(Order);

