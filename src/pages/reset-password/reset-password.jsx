import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {  
  const [valuePassword, setValuePassword] = useState('');
  const [valueCode, setValueCode] = useState('');
  //const { loading, order, error } = useSelector(state => state.order);
  const loading = false;
  const handlEnter = async () => {
    //dispatch(fetchCreateOrder(burgerConstructorData.map(item => item._id)));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
      <form className="form mb-20">      
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={valuePassword}
            onChange={e => setValuePassword(e.target.value)}            
            placeholder="Введите новый пароль"/>
        </div>
        <div className="mb-6 custom_input">
          <Input 
            name="code" 
            type="text" 
            placeholder="Введите код из письма"
            value={valueCode}
            onChange={e => setValueCode(e.target.value)}/>
        </div>
        <Button className="mt-6" type="primary" size="medium" onClick={handlEnter} disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Сохранить"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className="text text_color_accent" to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default memo(ResetPassword);
