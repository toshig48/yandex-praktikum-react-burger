import { memo, useState } from 'react';
import styles from './profile.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
  const [valueName, setValueName] = useState('');
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  //const { loading, order, error } = useSelector(state => state.order);
  const loading = false;
  const handlEnter = async () => {
    //dispatch(fetchCreateOrder(burgerConstructorData.map(item => item._id)));
  }

  return (
    <>
      <div className={`mt-30 ${styles.left_menu}`}>
          <a className={styles.item_a} href="/profile"><span className='text text_type_main-medium mt-6 mb-6'>Профиль</span></a>          
          <a className={styles.item_a} href="/profile"><span className='text text_type_main-medium mt-6 mb-6 text_color_inactive'>История заказов</span></a>
          <a className={styles.item_a} href="/profile"><span className='text text_type_main-medium mt-6 text_color_inactive'>Выход</span></a>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
      </div>
      
      <div className="mt-30">
      <form className="form mb-20">
        <div className="mb-6 custom_input">
          <Input 
            name="name" 
            type="text" 
            placeholder="Имя"
            value={valueName}
            onChange={e => setValueName(e.target.value)}/>
        </div>
        <div className="mb-6 custom_input">
          <Input 
            name="login" 
            type="text" 
            placeholder="Логин"
            value={valueLogin}
            onChange={e => setValueLogin(e.target.value)}/>
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={valuePassword}
            onChange={e => setValuePassword(e.target.value)}/>
        </div>
      </form>
      </div>
    </>
  );
}

export default memo(ProfilePage);
