import {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import {CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) =>
{
  const { header, isShowModal, toggleShowModal, children } = props;
  useEffect(() => {
    const close = (e) => {
      if(e.key === "Escape" || e.key === "Esc"){
        toggleShowModal();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  const handleCloseModal = () => {
    toggleShowModal();
  } 

  const handleDivClick = (e) => {
    e.stopPropagation();
  } 

  return ReactDOM.createPortal(
    <>
    {
      isShowModal &&
      <ModalOverlay handleCloseModal={handleCloseModal}>
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`} onClick={handleDivClick}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{header}</p>
          <CloseIcon onClick={handleCloseModal} type="primary" /> 
        </div>
        {children}
      </div>
    </ModalOverlay>
    }
    </>
    , modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  header: PropTypes.string,
  isShowModal: PropTypes.bool.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
};

