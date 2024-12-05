import { useState } from 'react';
import styles from './CreateAccount.module.css';
import IP from '../../../../IP.js';

export default function CreateAccount({ choseModal, toggleModal, toggleUserLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
      const response = await fetch(`http://${IP}:8000/auth/register/`, {
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
      }
    } catch (error) {
      console.error('Mistake: ', error)
    }
  }

  return (
    <>
      <div className={styles.body}>
        <h1 className={styles.body__title}>Create Account</h1>
        <h2 className={styles.body__subtitle}>
          <span>Already have an account?</span>
          <div
            onClick={() => {
              choseModal('Sign In');
            }}
          >Sign In.</div>
        </h2>
        <form className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.form__item}>
            <label className={styles.form__label} htmlFor="name">Name</label>
            <input className={styles.form__input}
              type="name"
              name="name"
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label} htmlFor="email">E-mail</label>
            <input className={styles.form__input}
              type="email"
              name="email"
              placeholder='e-mail@example.com'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label} htmlFor="passwords">Password</label>
            <input className={styles.form__input}
              type="password"
              name="password"
              placeholder='********'
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