import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

import LoginPage from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const authProtectedRoutes = [{ path: '/dash', component: <Dashboard /> }];

const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/register', component: <Register /> },
  {path: '*', component: <Navigate to="/login" />}
];

export { authProtectedRoutes, publicRoutes };
