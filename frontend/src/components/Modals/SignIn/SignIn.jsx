import { useState } from 'react';
import styles from './SignIn.module.css';
import IP from '../../../../IP.js';

export default function SignIn({ choseModal, toggleModal, toggleUserLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isRequestBad, setIsRequestBad] = useState(false);
  const toggleRequest = () => { setIsRequestBad(prev => !prev) }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(formData);
  }

  const sendData = async (data) => {
    try {
      const response = await fetch(`http://${IP}:8000/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Okay: ', result);
        localStorage.setItem('access_token', result.access);
        localStorage.setItem('refresh_token', result.refresh);
        toggleModal();
        toggleUserLogin();
      } else {
        console.error('Mistake: ', response.statusText);
        setFormData({
          email: '',
          password: '',
        });
        toggleRequest();
      }
    } catch (error) {
      console.error('Mistake: ', error)
    }
  }

  return (
    <>
      <div className={styles.body}>
        <h1 className={styles.body__title}>Sign In</h1>
        <h2 className={styles.body__subtitle}>
          <span>Don't have an account?</span>
          <div
            onClick={() => {
              choseModal('Create Account');
            }}
          >Create Account.</div>
        </h2>
        <form className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.form__item}>
            <label className={styles.form__label} htmlFor="email">E-mail</label>
            <input className={isRequestBad ? `${styles.form__input} ${styles.form__input_invalid}` : styles.form__input}
              type="email"
              name="email"
              placeholder={isRequestBad ? 'Invalid data' : 'e-mail@example.com'}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label} htmlFor="password">Password</label>
            <input className={isRequestBad ? `${styles.form__input} ${styles.form__input_invalid}` : styles.form__input}
              type="password"
              name="password"
              placeholder={isRequestBad ? 'Invalid data' : '********'}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className={styles.form__button} type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}