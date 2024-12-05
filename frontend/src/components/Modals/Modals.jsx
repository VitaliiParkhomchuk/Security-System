import { createPortal } from 'react-dom';

import styles from './Modals.module.css';

export default function Modals({ isModalOpen, toggleModal, chosenModal }) {
  return createPortal(
    <div className={`${styles.popup} ${isModalOpen ? styles.popup_active : ''}`}
      onClick={toggleModal}
    >
      <div className={styles.popup__body}>
        <div className={styles.popup__content}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.popup__cross} onClick={toggleModal}></button>
          {chosenModal}
        </div>
      </div>
    </div>, document.getElementById('modals')
  );
}