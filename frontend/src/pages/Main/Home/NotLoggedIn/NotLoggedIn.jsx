import { useState } from 'react';

import Modals from '../../../../components/modals/Modals';
import CreateAccount from '../../../../components/modals/CreateAccount/CreateAccount';
import SignIn from '../../../../components/modals/SignIn/SignIn';

import styles from './NotLoggedIn.module.css';

export default function NotLoggedIn({ toggleUserLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => { setIsModalOpen(prev => !prev) }

  const [chosenModal, setChosenModal] = useState('');
  const choseModal = (chose) => {
    switch (chose) {
      case 'Sign In':
        setChosenModal(<SignIn choseModal={choseModal} toggleModal={toggleModal} toggleUserLogin={toggleUserLogin} />);
        break;
      case 'Create Account':
        setChosenModal(<CreateAccount choseModal={choseModal} toggleModal={toggleModal} toggleUserLogin={toggleUserLogin} />);
        break;
      default:
        console.error('Error at modals form.');
    }
  }

  return (
    <>
      <section className={styles.home}>
        <h1 className={styles.home__title}>Security System</h1>
        <h2 className={styles.home__subtitle}>The best security system in the entire university of NUWM</h2>
        <div className={styles.account}>
          <button className={styles['account__sign-in']}
            onClick={() => {
              choseModal('Sign In');
              toggleModal();
            }}
          >
            Sign In
          </button>
          <button className={styles['account__create']}
            onClick={() => {
              choseModal('Create Account');
              toggleModal();
            }}
          >
            Create Account
          </button>
        </div>
      </section>
      <Modals isModalOpen={isModalOpen} toggleModal={toggleModal} chosenModal={chosenModal} />
    </>
  );
}