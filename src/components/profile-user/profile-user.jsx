import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { fetchSetInfoUser } from '../../services/thunks';

import styles from './profile-user.module.css';

function ProfileUser() {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(state => state.user);

  const [firstLoadFlag, setFirstLoadFlag] = useState(true);

  useEffect(() => {
    if (user.name !== undefined && firstLoadFlag) {
      setValue({ ...form, "name": user.name, "email": user.email });
      setFirstLoadFlag(false);
    }
  }, [user, firstLoadFlag]);

  const [changeFlag, setChangeFlag] = useState(false);
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setChangeFlag(true);
  };

  const handlCansel = async (e) => {
    e.preventDefault();
    setValue(user);
    setChangeFlag(false);
  }

  const handlOnsubmin = async (e) => {
    e.preventDefault();
    dispatch(fetchSetInfoUser(form.name, form.email, form.password));
    setChangeFlag(false);
  }

  return (
    <>
      <form onSubmit={handlOnsubmin} className="form mb-20">
        <div className="mb-6 custom_input">
          <Input
            icon={'EditIcon'}
            name="name"
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={onChange} />
        </div>
        <div className="mb-6 custom_input">
          <Input
            icon={'EditIcon'}
            name="email"
            type="text"
            placeholder="Логин"
            value={form.email}
            onChange={onChange} />
        </div>
        <div className='mb-6 custom_input'>
          <PasswordInput
            name="password"
            value={form.password}
            onChange={onChange} />
        </div>
        <div className={styles.right_align} style={{ visibility: changeFlag ? "visible" : "hidden" }}>
          <Button className="mt-6" type="secondary" size="medium" onClick={handlCansel} disabled={loading ? true : false}>
            Отмена
          </Button>
          <Button className="mt-6" type="primary" size="medium" disabled={loading ? true : false}>
            {loading ? "Ожидание..." : "Сохранить"}
          </Button>
        </div>
      </form>
      {
        error &&
        <p className="text text_type_main-default red mt-6">{error}</p>
      }
    </>
  );
}

export default memo(ProfileUser);
