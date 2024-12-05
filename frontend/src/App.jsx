import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";

import IP from '../IP.js';

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const toggleUserLogin = () => { setIsUserLogin(prev => !prev) }

  let checkpoint = 0;
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null && checkpoint == 0) {
      toggleUserLogin();
      checkpoint++;
    }
  }, [])

  const [userData, setUserData] = useState({
    name: 'Name',
    email: 'email',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://${IP}:8000/user/profile/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Помилка при завантаженні даних");
        } else {
          const result = await response.json();
          setUserData(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isUserLogin) {
      fetchData();
    }
  }, [isUserLogin]);

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header isUserLogin={isUserLogin} userData={userData} />
        <Main isUserLogin={isUserLogin} toggleUserLogin={toggleUserLogin} userData={userData} />
      </div>
    </BrowserRouter>
  )
}

export default App
