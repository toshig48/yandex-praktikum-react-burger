import { ReactChild } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { CustomizedState } from '../services/interfaces';

type TProtectedRouteProps = {
  redirectСondition: boolean,
  redirectPath: string,
  children?: ReactChild
};

export const ProtectedRoute = ({ redirectСondition, redirectPath, children }: TProtectedRouteProps) => {
  const location = useLocation();
  const state = location.state as CustomizedState;
  if (redirectСondition) {
    return <Navigate to={state?.location?.pathname || redirectPath} replace state={{ location }} />;
  }
  return children ? <>{children}</> : <Outlet />;
};