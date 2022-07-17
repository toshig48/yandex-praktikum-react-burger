import { FC, memo, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { useFormAndValidation } from '../../hooks/use-form-and-validation';
import { fetchForgotPasswordUser } from '../../services/thunks/index';
import { passwordClearError } from '../../services/slices/password';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';

import styles from './forgot-password.module.css';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useFormAndValidation();
  const { loading, allowResetPassword, error } = useAppSelector(state => state.password);

  useEffect(() => {
    dispatch(passwordClearError());
  }, [dispatch]);

  useEffect(() => {
    if (allowResetPassword) {
      return navigate("/reset-password");
    }
  }, [allowResetPassword, navigate]);

  const handlOnsubmin = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchForgotPasswordUser(values.email));
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
            value={values.email || ""}
            onChange={handleChange} />
        </div>
        <Button type="primary" size="medium" disabled={(loading) ? true : false}>
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

