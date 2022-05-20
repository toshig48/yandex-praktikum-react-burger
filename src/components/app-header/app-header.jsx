import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.menu_item}>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="/">
            <BurgerIcon type='primary' />
            <span className='text text_type_main-default ml-2'>
              Конструктор
            </span>
          </Link>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="/">
            <ListIcon type="secondary" />
            <span className="secondary text text_type_main-default ml-2">
              Лента заказов
            </span>
          </Link>
        </div>
        <div className={styles.menu_item}>
          <Logo />
        </div>
        <div className={styles.menu_item}>
          <Link className={`${styles.menu_item_a} p-4 mt-4 mb-4`} to="profile">
            <ProfileIcon type="secondary" />
            <span className="secondary text text_type_main-default ml-2">
              Личный кабинет
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default memo(AppHeader);
