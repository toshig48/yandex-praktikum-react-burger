import { FC, memo } from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';

import ProfileUser from '../../components/profile-user/profile-user';

import { fetchLogoutUser } from '../../services/thunks/index';
import { useAppDispatch } from '../../hooks/dispatch';

import styles from './profile.module.css';
import OrdersUser from '../../components/orders-user/orders-user';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;

  const handlExit = async () => {
    dispatch(fetchLogoutUser());
  }

  return (
    <>
      <div className={`mt-30 ${styles.left_menu}`}>
        <ul>
          <li>
            <Link to="/profile">
              <span className={`text text_type_main-medium ${pathname !== '/profile' && "text_color_inactive"}`}>Профиль</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/orders">
              <span className={`text text_type_main-medium ${pathname !== '/profile/orders' && "text_color_inactive"}`}>История заказов</span>
            </Link>
          </li>
          <li>
            <p onClick={handlExit} className='text text_type_main-medium mt-6 text_color_inactive cursor_pointer'>
              Выход
            </p>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-30">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className="ml-15">
        <Routes>
          <Route path='/' element={<ProfileUser />} />
          <Route path='orders' element={<OrdersUser />} />
        </Routes>
      </div>
    </>
  );
}

export default memo(ProfilePage);
