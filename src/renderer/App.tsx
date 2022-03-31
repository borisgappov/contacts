import 'devextreme/dist/css/dx.light.css';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './components/Contacts';
import Home from './components/Home';
import { setInitialized } from './store/contactsSlice';
import store from './store/store';
import './styles.css';

function AppRouter() {
  const dispatch = useDispatch();
  dispatch(setInitialized(window.electron.store.get('isInitialized')));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
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
