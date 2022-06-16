import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

const NotFound404Page = () => {

  return (
    <div className={styles.main}>
      <h1>Оуч! 404 Error</h1>
      <p>Такой страницы не существует</p>
      <p>Проверьте адрес или перейдите на <Link className="text text_color_accent" to='/'>главную страницу</Link></p>
    </div>
  );
}

export default memo(NotFound404Page);
