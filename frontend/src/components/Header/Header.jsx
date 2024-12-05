import { useState } from 'react';
import LogoImg from '../../assets/img/logo.png';
import ProfileImg from '../../assets/img/profile-img.svg';

import styles from './Header.module.css';

export default function Header({ isUserLogin, userData }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const toggleBurgerMenu = () => { setIsBurgerMenuOpen(prev => !prev) }

  return (
    <header className={styles.header}>
      <div className='header__container'>
        <div className={styles.header__body}>
          <div className={styles.logo}>
            <img className={styles.logo__img} src={LogoImg} alt="LogoImg" />
            <div className={styles.logo__title}>Security System</div>
          </div>
          <nav className={!isBurgerMenuOpen ? styles.nav : `${styles.nav} ${styles.nav_active}`}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <a href="https://github.com/Brewery-Code/Security-System"
                  target='_blank'
                  rel='noopener noreferrer'>GitHub
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href="https://nuwm.edu.ua/"
                  target='_blank'
                  rel='noopener noreferrer'>University
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href="https://github.com/VitaliiParkhomchuk"
                  target='_blank'
                  rel='noopener noreferrer'>About us
                </a>
              </li>
              {isUserLogin ?
                <li className={styles.profile}>
                  <img className={styles.profile__img} src={ProfileImg} alt="profileImg" />
                  <div className={styles.profile__name}>{userData.name}</div>
                </li> : ''}
            </ul>
          </nav>
          <div className={!isBurgerMenuOpen ? styles.burger : `${styles.burger} ${styles.burger_active}`}
            onClick={toggleBurgerMenu}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header >
  );
}