import 'devextreme/dist/css/dx.light.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Contacts from './components/Contacts';
import Home from './components/Home';
import { selectAuthenticated, setInitialized } from './store/contactsSlice';
import store from './store/store';
import './styles.css';

function AppRouter() {
  const dispatch = useDispatch();
  dispatch(setInitialized(window.electron.store.get('isInitialized')));
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contacts"
          element={authenticated ? <Contacts /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
