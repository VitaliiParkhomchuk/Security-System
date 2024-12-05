import { useState, useEffect } from 'react';

import Modals from '../../../../components/modals/Modals';
import NewDevice from '../../../../components/Modals/NewDevice/NewDevice';

import styles from './LoggedIn.module.css';

import IP from '../../../../../IP.js';

export default function LoggedIn({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => { setIsModalOpen(prev => !prev) }
  const chosenModal = <NewDevice toggleModal={toggleModal} />;

  const [devicesData, setDevicesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://${IP}:8000/sensors/get/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }
        const result = await response.json();
        setDevicesData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);



  return (
    <>
      <section className={styles.home}>
        <div className={styles['top-bar']}>
          <div className="">
            <button className={styles['top-bar__new']}
              onClick={toggleModal}
            >
              New +
            </button>
          </div>
          <h3 className={styles['top-bar__name']}>{userData.name}</h3>
          <h3 className={styles['top-bar__email']}>{userData.email}</h3>
        </div>
        <div className={styles.devices}>
          {devicesData.length > 0 ? (
            devicesData.map((device) => (
              <>
                <div key={1} className={styles.device}>
                  <div className={styles.device__item}>{device.name}</div>
                  <div className={styles.indicators}>{device.sensor_value}</div>
                </div>
              </>
            ))
          ) : (
            <>
              <div key={1} className={styles.devices}>
                <div className={styles.devices__item_empty}>Add your devices!)</div>
              </div>
            </>
          )}
        </div>
      </section>
      <Modals isModalOpen={isModalOpen} toggleModal={toggleModal} chosenModal={chosenModal} />
    </>
  );
}