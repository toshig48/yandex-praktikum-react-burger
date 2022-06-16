import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
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