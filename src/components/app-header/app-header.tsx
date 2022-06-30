import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = () => {
  const pathname: string = useLocation().pathname;
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.menu_item}>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="/">
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <span className={`${pathname !== '/' && "secondary"} text text_type_main-default ml-2`}>
              Конструктор
            </span>
          </Link>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="/list">
            <ListIcon type={pathname === '/list' ? 'primary' : 'secondary'} />
            <span className={`${pathname !== '/list' && "secondary"} text text_type_main-default ml-2`}>
              Лента заказов
            </span>
          </Link>
        </div>
        <div className={styles.menu_item}>
          <Link className={`${styles.menu_item_a}`} to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.menu_item}>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="profile">
            <ProfileIcon type={pathname.indexOf('/profile') ? 'secondary' : 'primary'} />
            <span className={`${pathname.indexOf('/profile') && "secondary"} text text_type_main-default ml-2`}>
              Личный кабинет
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default memo(AppHeader);
