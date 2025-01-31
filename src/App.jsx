import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/auth/authSlice';
import Routes from './Routes';

import './assets/scss/theme.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  });
  return <Routes />;
}

export default App;
