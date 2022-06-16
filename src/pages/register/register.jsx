import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useFormAndValidation } from '../../hooks/use-form-and-validation';
import { fetchRegisterUser } from '../../services/thunks';
import { userClearError } from '../../services/slices/user';

import styles from './register.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useFormAndValidation();
  const {loading, error } = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(userClearError());
 },[dispatch]);

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(values.name, values.email, values.password));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Регистрация</h3>
      <form onSubmit={handlOnsubmin}>
      <div className="mb-6 custom_input">
          <Input 
            name="name" 
            type="text" 
            placeholder="Имя"
            value={values.name || ""}
            onChange={handleChange}/>
        </div>
        <div className="mb-6 custom_input">
          <Input 
            name="email" 
            type="email" 
            placeholder="E-mail"
            value={values.email || ""}
            onChange={handleChange}/>
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={values.password || ""}
            onChange={handleChange}/>
        </div>
        <Button className="mt-6" type="primary" size="medium" disabled={(loading) ? true : false}>
          {loading ? "Ожидание..." : "Зарегистрироваться"}
        </Button>
      </form>
        {
          error &&
          <p className="text text_type_main-default red mt-6">{error}</p>
        }
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистированы? <Link className="text text_color_accent" to="/login">Войти</Link>
        </p>
    </div>
  );
}

export default memo(RegisterPage);
