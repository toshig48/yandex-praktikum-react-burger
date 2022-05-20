import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const LoginPage = () => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  //const { loading, order, error } = useSelector(state => state.order);
  const loading = false;
  const handlEnter = async () => {
    //dispatch(fetchCreateOrder(burgerConstructorData.map(item => item._id)));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Вход</h3>
      <form className="form mb-20">
        <div className="mb-6 custom_input">
          <Input 
            name="email" 
            type="email" 
            placeholder="E-Mail"
            value={valueEmail}
            onChange={e => setValueEmail(e.target.value)}/>
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={valuePassword}
            onChange={e => setValuePassword(e.target.value)}/>
        </div>
        <Button className="mt-6" type="primary" size="medium" onClick={handlEnter} disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Войти"}
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь? <Link className="text text_color_accent" to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link className="text text_color_accent" to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>

    </div>
  );
}

export default memo(LoginPage);
