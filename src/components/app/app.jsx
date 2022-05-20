import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from '../app-header/app-header';

import { ForgotPasswordPage, LoginPage, ProfilePage, HomePage, RegisterPage, ResetPasswordPage, NotFound404Page } from '../../pages/';

import styles from './app.module.css';
import Modal from '../modal/modal';
import { fetchAllIngredients } from '../../services/thunks';
import { showModal } from '../../services/slices';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.allIngredients.items);
  const { loading, error } = useSelector(state => state.allIngredients);

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
    <>
      <div className={styles.app}>
        <BrowserRouter>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <div className={styles.main}>

              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='forgot-password' element={<ForgotPasswordPage />} />
                <Route path='reset-password' element={<ResetPasswordPage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='ingredients/:id' element={<ProfilePage />} />                
                <Route path='*' element={<NotFound404Page />} />
              </Routes>
            </div>
          </DndProvider>
        </BrowserRouter>
      </div>
      {
        isShowModal &&
        <Modal />
      }
    </>
  );
}

export default App;
