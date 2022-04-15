import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.menu_item}>
          <a className={styles.menu_item_a} href="#"><BurgerIcon type='primary'/> <span className='text text_type_main-default ml-2'>Конструктор</span></a>
          <a className={`${styles.menu_item_a} p-4 mt-4 mb-4`} href="#"><ListIcon type='secondary'/><span className={`${styles.secondary} text text_type_main-default ml-2`}>Лента заказов</span></a>           
        </div>    
        <div className={styles.menu_item}>
          <Logo />
        </div>
        <div className={styles.menu_item}>
          <a className={styles.menu_item_a} href="#"><ProfileIcon type='secondary'/><span className={`${styles.secondary} text text_type_main-default ml-2`}>Личный кабинет</span></a>
        </div>
      </nav>   
    </header>
  );
}

export default AppHeader;
