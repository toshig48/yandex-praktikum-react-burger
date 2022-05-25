import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route, useLocation } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../routes';
import Modal from '../modal/modal';
import { ForgotPasswordPage, LoginPage, ProfilePage, HomePage, RegisterPage, ResetPasswordPage, IngredientDetails, NotFound404Page, Orders } from '../../pages/';

import { fetchTokenUser } from '../../services/thunks';
import { GetRefreshToken } from '../../utils/token';
import { fetchAllIngredients, fetchGetInfoUser } from '../../services/thunks';
import { showModal } from '../../services/slices';


import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector(state => state.allIngredients.items);
  const { loading, error } = useSelector(state => state.allIngredients);
  const { allowResetPassword } = useSelector(state => state.password);
  const { loggedIn, user } = useSelector(state => state.user);

  useEffect(() => {
    const refreshToken = GetRefreshToken();
    if (refreshToken) {
      dispatch(fetchTokenUser(refreshToken));
    }
  }, [dispatch])

  useEffect(() => {
    if (loggedIn && user.name === undefined) {
      dispatch(fetchGetInfoUser())
    }
  }, [user, loggedIn, dispatch]);

  useEffect(() => {
    if (!loading && !error && data.length === 0) {
      dispatch(fetchAllIngredients());
    }
  }, [loading, data, error, dispatch])

  useEffect(
    () => {
      if (error) {
        dispatch(showModal({
          title: "",
          content: `Ошибка при получении данных от API: ${error}`
        }));
      }
    },
    [error, dispatch]
  );

  const { isShowModal } = useSelector(state => state.modal);

  if (loading) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Загрузка данных...</p>
    );
  }
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main}>
            <Routes location={location.state?.pathnameModal !== undefined ? location.state.pathnameModal : location.pathname}>
              <Route path='/' element={<HomePage />} />

              <Route element={<ProtectedRoute redirectСondition={loggedIn} redirectPath="/" />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='forgot-password' element={<ForgotPasswordPage />} />
              </Route>

              <Route element={<ProtectedRoute redirectСondition={loggedIn && !allowResetPassword} redirectPath="forgot-password" />}>
                <Route path='reset-password' element={<ResetPasswordPage />} />
              </Route>

              <Route element={<ProtectedRoute redirectСondition={!loggedIn} redirectPath="login" />}>
                <Route path='profile/*' element={<ProfilePage />} />
                <Route path='list' element={<Orders />} />
              </Route>

              <Route path='ingredients/:id' element={<IngredientDetails />} />

              <Route path='*' element={<NotFound404Page />} />
            </Routes>
          </div>
        </DndProvider>
      </div>
      {
        isShowModal &&
        <Modal />
      }
    </>
  );
}

export default App;
