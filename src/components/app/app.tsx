import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route, useLocation } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route';
import Modal from '../modal/modal';
import { ForgotPasswordPage, LoginPage, ProfilePage, HomePage, RegisterPage, ResetPasswordPage, IngredientDetails, NotFound404Page, Orders } from '../../pages';

import { getRefreshToken } from '../../services/utils/token';
import { fetchTokenUser, fetchAllIngredients, fetchGetInfoUser } from '../../services/thunks/index';
import { showModal, wsAllOrdersInit, wsUserOrdersInit } from '../../services/slices';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch'

import styles from './app.module.css';
import { CustomizedState } from '../../services/interfaces';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const data = useAppSelector((state) => state.allIngredients.items);
  const { loading, error } = useAppSelector((state) => state.allIngredients);
  const { allowResetPassword } = useAppSelector((state) => state.password);
  const { loggedIn, user } = useAppSelector((state) => state.user);
  const { isShowModal } = useAppSelector((state) => state.modal);
  const isConnectedWSUserOrders = useAppSelector((state) => state.wsUserOrders.isConnected);
  const isConnectedWSAllOrders = useAppSelector((state) => state.wsAllOrders.isConnected);

  // Если пользователь залогинен и веб-сокет списка заказов пользователя не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnectedWSUserOrders && user) {
      dispatch(wsUserOrdersInit());
    }
  }, [dispatch, isConnectedWSUserOrders, user])

  // Если пользователь залогинен и веб-сокет списка всех заказов не инициализирован - инициализируем:
  useEffect(() => {
    if (!isConnectedWSAllOrders) {
      dispatch(wsAllOrdersInit());
    }
  }, [dispatch, isConnectedWSAllOrders])

  // Если есть RefreshToken, то получаем AccessToken:
  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      dispatch(fetchTokenUser(refreshToken));
    }
  }, [dispatch])

  // Если пользак залогинен, но инфы о пользаке нет - загружаем инфу:
  useEffect(() => {
    if (loggedIn && user?.name === undefined) {
      dispatch(fetchGetInfoUser())
    }
  }, [user, loggedIn, dispatch]);

  // Загружаем список ингридиентов:
  useEffect(() => {
    if (!loading && !error && data.length === 0) {
      dispatch(fetchAllIngredients());
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
              <Route path='feed' element={<Orders />} />
              <Route path='ingredients/:id' element={<IngredientDetails />} />

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
