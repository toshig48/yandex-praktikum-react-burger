import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ redirectСondition, redirectPath, children }) => {
  const location = useLocation();
  if (redirectСondition) {
    return <Navigate to={location.state?.location.pathname || redirectPath} replace state={{ location }} />;
  }
  return children ? children : <Outlet />;
};