import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../routes';
import { fetchTokenUser } from '../../services/thunks';
import { GetRefreshToken } from '../../utils/token';

import { ForgotPasswordPage, LoginPage, ProfilePage, HomePage, RegisterPage, ResetPasswordPage, IngredientDetails, NotFound404Page } from '../../pages/';

import styles from './app.module.css';
import Modal from '../modal/modal';
import { fetchAllIngredients, fetchGetInfoUser } from '../../services/thunks';
import { showModal } from '../../services/slices';

const App = () => {
  const dispatch = useDispatch();
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
    if (!loading && data.length === 0) {
      dispatch(fetchAllIngredients());
    }
  }, [loading, data, dispatch])

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
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main}>

            <Routes>
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
    </BrowserRouter>
  );
}

export default App;
