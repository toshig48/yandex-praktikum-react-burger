import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function App() {

  return (
    <header>
      <nav>
      <ul>
        <li>
          <a href="#"><BurgerIcon type='primary'/>Конструктор</a>
          <a href="#"><span><ListIcon type='primary'/>Лента заказов</span></a> 
        </li>    
        <li><Logo /></li>
        <li><a href="#"><span><ProfileIcon type='primary'/>Личный кабинет</span></a></li>
      </ul>        
      </nav>              
    </header>
  );
}

export default App;
