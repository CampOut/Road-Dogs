import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthProtected = (props) => {
  const { loading, user } = useSelector((state) => state.auth);

  if (!user && loading) {
    return (
      <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
    );
  }
  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {' '}
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
