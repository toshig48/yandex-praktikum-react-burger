import { memo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useFormAndValidation } from '../../hooks/use-form-and-validation';
import { fetchResetPasswordUser } from '../../services/thunks';
import { passwordClearError } from '../../services/slices/password';

import styles from './reset-password.module.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useFormAndValidation();
  const { loading, allowResetPassword, error } = useSelector(state => state.password);

  useEffect(() => {
    dispatch(passwordClearError());
  }, [dispatch]);

  useEffect(() => {
    if (!allowResetPassword) {
      return navigate("/login");
    }
  }, [allowResetPassword, navigate]);


  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchResetPasswordUser(values.password, values.code));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
      <form onSubmit={handlOnsubmin}>
        <div className='mb-6 custom_input'>
          <PasswordInput
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Введите новый пароль" />
        </div>
        <div className="mb-6 custom_input">
          <Input
            name="code"
            type="text"
            value={values.code || ""}
            onChange={handleChange}
            placeholder="Введите код из письма" />
        </div>
        <Button className="mt-6" type="primary" size="medium" disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Сохранить"}
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

export default memo(ResetPassword);
