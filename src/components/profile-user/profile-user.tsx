import React, { memo, useState, useEffect, SyntheticEvent } from 'react';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useFormAndValidation } from '../../hooks/use-form-and-validation';
import { fetchSetInfoUser } from '../../services/thunks/index';

import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';

import styles from './profile-user.module.css';

const ProfileUser = () => {
  const dispatch = useAppDispatch();
  const { loading, user, error } = useAppSelector(state => state.user);

  const [firstLoadFlag, setFirstLoadFlag] = useState(true);

  const { values, setValues, isChange, setIsChange, handleChange, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (user !== null && firstLoadFlag) {
      setValues({ "name": user.name, "email": user.email });
      setFirstLoadFlag(false);
    }
  }, [user, firstLoadFlag, setValues]);


  const handlCansel = async (e: SyntheticEvent) => {
    e.preventDefault();
    resetForm({ ...values, "name": user!.name, "email": user!.email });
  }

  const handlOnsubmin = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchSetInfoUser(values.name, values.email, values.password));
    setIsChange(false);
  }

  return (
    <div className="mt-30">
      <form onSubmit={handlOnsubmin} className="form mb-20">
        <div className="mb-6 custom_input">
          <Input
            icon={'EditIcon'}
            name="name"
            type="text"
            placeholder="Имя"
            value={values.name || ""}
            onChange={handleChange} />
        </div>
        <div className="mb-6 custom_input">
          <Input
            icon={'EditIcon'}
            name="email"
            type="text"
            placeholder="Логин"
            value={values.email || ""}
            onChange={handleChange} />
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput
            name="password"
            value={values.password || ""}
            onChange={handleChange} />
        </div>
        <div className={styles.right_align} style={{ visibility: isChange ? "visible" : "hidden" }}>
          <Button type="secondary" size="medium" onClick={handlCansel} disabled={loading ? true : false}>
            Отмена
          </Button>
          <Button type="primary" size="medium" disabled={loading ? true : false}>
            {loading ? "Ожидание..." : "Сохранить"}
          </Button>
        </div>
      </form>
      {
        error &&
        <p className="text text_type_main-default red mt-6">{error}</p>
      }
    </div>
  );
}

export default memo(ProfileUser);