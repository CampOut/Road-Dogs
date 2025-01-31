import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { layoutTypes } from '../constants/layout';

import { AuthProtected } from './AuthProtected';
import { authProtectedRoutes, publicRoutes } from './routes';

import NonAuthLayout from '../Layout/NonAuthLayout';
import Vertical from '../Layout/Vertical'

const tempLayout = ({ children }) => <>{children}</>;

const getLayout = (layoutType) => {
  let Layout = tempLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = tempLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = tempLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const AppRoutes = () => {
  const layoutType = '';

  const Layout = getLayout(layoutType);
  return (
    <Routes>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>
      <Route>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthProtected>
                <Layout>{route.component}</Layout>
              </AuthProtected>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
