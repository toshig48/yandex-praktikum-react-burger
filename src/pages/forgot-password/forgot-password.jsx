import { memo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { fetchForgotPasswordUser } from '../../services/thunks';
import { passwordClearError } from '../../services/slices/password';

import styles from './forgot-password.module.css';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueEmail, setValueEmail] = useState('');
  const { loading, allowResetPassword, error } = useSelector(state => state.password);

  useEffect(() => {
    dispatch(passwordClearError());
  }, [dispatch]);

  useEffect(() => {
    if (allowResetPassword) {
      return navigate("/reset-password");
    }
  }, [allowResetPassword, navigate]);

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchForgotPasswordUser(valueEmail));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
      <form onSubmit={handlOnsubmin}>
        <div className="mb-6 custom_input">
          <Input
            name="email"
            type="email"
            placeholder="Укажите e-mail"
            value={valueEmail}
            onChange={e => setValueEmail(e.target.value)} />
        </div>
        <Button className="mt-6" type="primary" size="medium" disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Восстановить"}
        </Button>
      </form>
      {
        error &&
        <p className="text text_type_main-default red mt-6">{error}</p>
      }
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link className="text text_color_accent" to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default memo(ForgotPasswordPage);
