import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { fetchSetInfoUser, fetchLogoutUser } from '../../services/thunks';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(state => state.user);

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [changeFlag, setChangeFlag] = useState(false);

  useEffect(() => {
    if (user.name !== undefined) {
      setValue({ ...form, "name": user.name, "email": user.email });
    }
  }, [user, form, dispatch]);

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
  }

  const handlExit = async () => {
    dispatch(fetchLogoutUser());
  }

  return (
    <>
      <div className={`mt-30 ${styles.left_menu}`}>
        <a className={styles.item_a} href="/profile">
          <span className='text text_type_main-medium mt-6 mb-6'>Профиль</span>
        </a>
        <a className={styles.item_a} href="/profile">
          <span className='text text_type_main-medium mt-6 mb-6 text_color_inactive'>История заказов</span>
        </a>
        <p onClick={handlExit} className='text text_type_main-medium mt-6 text_color_inactive cursor_pointer'>
          Выход
        </p>
        <p className="text text_type_main-default text_color_inactive mt-30">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className="mt-30 ml-15">
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
          <div className={styles.right_align}>
            <Button className="mt-6" type="secondary" size="medium" onClick={handlCansel} disabled={(loading || !changeFlag) ? true : false}>
              Отмена
            </Button>
            <Button className="mt-6" type="primary" size="medium" disabled={(loading || !changeFlag) ? true : false}>
              {loading ? "Ожидание..." : "Сохранить"}
            </Button>
          </div>
        </form>
        {
          error &&
          <p className="text text_type_main-default red mt-6">{error}</p>
        }
      </div>
    </>
  );
}

export default memo(ProfilePage);
