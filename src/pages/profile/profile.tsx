import { FC, memo, useMemo } from 'react';
import { Link, useLocation, Routes, Route, useParams } from 'react-router-dom';

import ProfileUser from '../../components/profile-user/profile-user';

import { fetchLogoutUser } from '../../services/thunks/index';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';

import styles from './profile.module.css';
import OrdersUser from '../../components/orders-user/orders-user';
import { CustomizedState } from '../../services/interfaces';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const pathname = location.pathname;
  const urlParams = useParams();

  const isShowModal = useAppSelector(state => state.modal.isShowModal);

  const handlExit = async () => {
    dispatch(fetchLogoutUser());
  }

  const showLeftMenu = useMemo(
    () => pathname === '/profile' || pathname === '/profile/orders' || isShowModal,
    [pathname, isShowModal]
  );
  return (
    <>
      {
        showLeftMenu &&
        <div className={`mt-30 ${styles.left_menu}`}>
          <ul>
            <li>
              <Link to="/profile">
                <span className={`text text_type_main-medium ${pathname !== '/profile' && "text_color_inactive"}`}>Профиль</span>
              </Link>
            </li>
            <li>
              <Link to="/profile/orders">
                <span className={`text text_type_main-medium ${pathname.indexOf('/profile/orders') && "text_color_inactive"}`}>История заказов</span>
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
      }
      <Routes location={state?.pathnameModal !== undefined ? state?.pathnameModal : pathname}>
        <Route path='/' element={<ProfileUser />} />
        <Route path='orders/*' element={<OrdersUser />} />
      </Routes>
    </>
  );
}

export default memo(ProfilePage);
