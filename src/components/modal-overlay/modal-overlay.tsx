import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  handleCloseModal: () => void;
  children: ReactNode;
};

function ModalOverlay(props : TModalOverlayProps) {
  return (
    <div onClick={props.handleCloseModal} className={styles.modal_overlay}>
      {props.children}
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};