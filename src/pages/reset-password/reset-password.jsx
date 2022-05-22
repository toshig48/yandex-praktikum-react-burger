import { memo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchResetPasswordUser} from '../../services/thunks';
import { passwordClearError } from '../../services/slices/password';
const ResetPassword = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ password: '', code: '' });

  const {loading, allowResetPassword, error } = useSelector(state => state.password);

  useEffect(() => {
    dispatch(passwordClearError());
 },[dispatch]);

  useEffect(() => {
    if (!allowResetPassword){
       return navigate("/login");
    }
 },[allowResetPassword, navigate]);

 
 const onChange = e => {
  setValue({ ...form, [e.target.name]: e.target.value });
};

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchResetPasswordUser(form.password, form.code));
  }

  return (
    <div className={styles.main}>
      <h3 className='text text_type_main-medium mb-6'>Восстановление пароля</h3>
      <form onSubmit={handlOnsubmin}>      
        <div className='mb-6 custom_input'>
          <PasswordInput 
            name="password"
            value={form.password}
            onChange={onChange}         
            placeholder="Введите новый пароль"/>
        </div>
        <div className="mb-6 custom_input">
          <Input 
            name="code" 
            type="text" 
            value={form.code}
            onChange={onChange}              
            placeholder="Введите код из письма"/>
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
