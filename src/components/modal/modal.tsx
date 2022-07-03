import ReactDOM from 'react-dom';
import { useEffect, memo, useCallback, SyntheticEvent } from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { closeModal } from '../../services/slices';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import styles from './modal.module.css';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { titleModal, contentModal, isNavigateGoBack } = useAppSelector(state => state.modal);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
    if (isNavigateGoBack) {
      navigate(-1);
    }
  }, [dispatch]);

  const close = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Esc") {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close)
  }, [close])

  const handleDivClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay handleCloseModal={handleCloseModal}>
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`} onClick={handleDivClick}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{titleModal}</p>
          <CloseIcon onClick={handleCloseModal} type="primary" />
        </div>
        {contentModal}
      </div>
    </ModalOverlay>
    , modalRoot
  );
}

export default memo(Modal);
