import { useState } from 'react';
import styles from './NewDevice.module.css';
import IP from '../../../../IP.js';

export default function NewDevice({ toggleModal }) {
  const [formData, setFormData] = useState({
    serial_number: '',
    sensor_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://${IP}:8000/sensors/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          serial_number: formData.serial_number,
          sensor_name: formData.sensor_name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add device: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Device added successfully:', result);

      setFormData({ sensor_name: '', serial_number: '' });
      toggleModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.body__title}>Add new device</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__item}>
          <label className={styles.form__label} htmlFor="sensor_name">Name</label>
          <input
            className={styles.form__input}
            type="text"
            name="sensor_name"
            placeholder="Sensor name"
            value={formData.sensor_name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__label} htmlFor="serial_number">Serial number</label>
          <input
            className={styles.form__input}
            type="text"
            name="serial_number"
            placeholder="Serial number"
            value={formData.serial_number}
            onChange={handleChange}
          />
        </div>
        <button className={styles.form__button} type="submit">Add device</button>
      </form>
    </div>
  );
}
