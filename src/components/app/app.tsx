import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route, useLocation } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route';
import Modal from '../modal/modal';
import { ForgotPasswordPage, LoginPage, ProfilePage, HomePage, RegisterPage, ResetPasswordPage, IngredientDetails, NotFound404Page, Orders } from '../../pages';

import { getRefreshToken } from '../../services/utils/token';
import { fetchTokenUser, fetchAllIngredients, fetchGetInfoUser } from '../../services/thunks/index';
import { showModal } from '../../services/slices';

import styles from './app.module.css';
import { CustomizedState } from '../../services/interface';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const data = useSelector((state: any) => state.allIngredients.items);
  const { loading, error } = useSelector((state: any) => state.allIngredients);
  const { allowResetPassword } = useSelector((state: any) => state.password);
  const { loggedIn, user } = useSelector((state: any) => state.user);
  const { isShowModal } = useSelector((state: any) => state.modal);

  // Если есть RefreshToken, то получаем AccessToken:
  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      dispatch(fetchTokenUser(refreshToken) as any);
    }
  }, [dispatch])

  // Если пользак залогинен, но инфы о пользаке нет - загружаем инфу:
  useEffect(() => {
    if (loggedIn && user.name === undefined) {
      dispatch(fetchGetInfoUser() as any)
    }
  }, [user, loggedIn, dispatch]);

  // Загружаем список ингридиентов:
  useEffect(() => {
    if (!loading && !error && data.length === 0) {
      dispatch(fetchAllIngredients() as any);
    }
  }, [loading, data, error, dispatch])

  // Вызываем модальное окно при наличии ошибки:
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
            <Routes location={state?.pathnameModal !== undefined ? state?.pathnameModal : location.pathname}>
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
        isShowModal && <Modal />
      }
    </>
  );
}

export default App;

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
