import { memo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { fetchRegisterUser } from '../../services/thunks';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valueName, setValueName] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const {loading, loggedIn, error } = useSelector(state => state.user);
  
  useEffect(() => {
    if (loggedIn){
       return navigate("/");
    }
 },[loggedIn]);

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(valueName, valueEmail, valuePassword));
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
            value={valueName}
            onChange={e => setValueName(e.target.value)}/>
        </div>
        <div className="mb-6 custom_input">
          <Input 
            name="email" 
            type="email" 
            placeholder="E-mail"
            value={valueEmail}
            onChange={e => setValueEmail(e.target.value)}/>
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={valuePassword}
            onChange={e => setValuePassword(e.target.value)}/>
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
