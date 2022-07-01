import { FC, memo, MutableRefObject } from "react";
import { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { TBurger } from '../../services/types';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient, moveIngredient } from '../../services/slices';
import { useAppDispatch } from '../../hooks/dispatch';

import styles from "./no-bun-element.module.css";

interface INoBunElement {
    item: TBurger;
    index: number;
};

const NoBunElement: FC<INoBunElement> = (props) => {
    const { item, index } = props;
    const dispatch = useAppDispatch();

    const handleRemoveElement = (index: number) => {
        dispatch(removeIngredient(index));
    }

    const ref = useRef<HTMLLIElement>(null) as MutableRefObject<HTMLLIElement>;
    const [handlerId, drop] = useDrop<TBurger>({
        accept: 'selectedIngredient',
        collect(monitor: DropTargetMonitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: TBurger, monitor: DropTargetMonitor) {
            if (!ref.current) return

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

                dispatch(moveIngredient({ dragIndex, hoverIndex }));

                item.index = hoverIndex
            }
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
            <DragIcon type={"primary"} />
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

