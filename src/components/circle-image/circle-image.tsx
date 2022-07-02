import { FC, memo } from "react";
import { TBurger } from '../../services/types';

import styles from "./circle-image.module.css";

interface ICircleImage {
    data: TBurger;
    zIndex: number;
    ingredientsCountPlus: number;
};

const CircleImage: FC<ICircleImage> = (props) => {
    const { data, zIndex, ingredientsCountPlus } = props;
    return (
        <div className={styles.img_circle} style={{ 'zIndex': zIndex }}>
            <img className={ingredientsCountPlus > 0 ? styles.img_blackout : ''} src={data.image} alt={data.name} ></img>
            {ingredientsCountPlus > 0 && <span>+{ingredientsCountPlus}</span>
            }
        </div>
    );
}

export default memo(CircleImage);


