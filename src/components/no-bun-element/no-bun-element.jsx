import { memo } from "react";
import { useDispatch } from 'react-redux';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient, moveIngredient } from '../../services/slices';
import { burgerPropTypes } from '../../utils/prop-types.js';

import styles from "./no-bun-element.module.css";

const NoBunElement = (props) => {
    const { item, index } = props;
    const dispatch = useDispatch();

    const handleRemoveElement = (index) => {
        dispatch(removeIngredient(index));
    }

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'selectedIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) return

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            dispatch(moveIngredient({ dragIndex, hoverIndex }));

            item.index = hoverIndex
        },
    })

    const [{ opacity }, drag] = useDrag({
        type: 'selectedIngredient',
        item: () => {
            return { item, index }
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    drag(drop(ref));

    return (
        <li ref={ref} className={`${styles.item} mb-4 mr-2`} style={{ opacity }} data-handler-id={handlerId}>
            <DragIcon />
            <i className="ml-2" />
            <ConstructorElement
                price={item.price}
                text={item.name}
                thumbnail={item.image}
                isLocked={false}
                handleClose={() => handleRemoveElement(index)} />
        </li>
    );
}

export default memo(NoBunElement);


NoBunElement.propTypes = {
    item: burgerPropTypes.isRequired,
    index: PropTypes.number.isRequired
};
