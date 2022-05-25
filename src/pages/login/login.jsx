import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { fetchLoginUser } from '../../services/thunks';
import { userClearError } from '../../services/slices/user';

import styles from './login.module.css';
const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '' });

  const { loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(userClearError());
  }, [dispatch]);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchLoginUser(form.email, form.password));
  }
  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Вход</h3>
      <form onSubmit={handlOnsubmin}>
        <div className="mb-6 custom_input">
          <Input
            name="email"
            type="email"
            placeholder="E-Mail"
            value={form.email}
            onChange={onChange} />
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput
            name="password"
            value={form.password}
            onChange={onChange} />
        </div>
        <Button className="mt-6" type="primary" size="medium" disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Войти"}
        </Button>
      </form>
      {
        error &&
        <p className="text text_type_main-default red mt-6">{error}</p>
      }
      <div className="mt-20">
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
