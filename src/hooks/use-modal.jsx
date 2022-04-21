import {useState } from 'react';

export const useModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleShowModal = () => {
      setIsShowModal(!isShowModal);
  }
  return [isShowModal, toggleShowModal];
};

export default useModal;

