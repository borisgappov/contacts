import 'devextreme/dist/css/dx.light.css';
import { useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePasswordPopup from './CreatePasswordPopup';

const Home = () => {
  const [initialized, setInitialized] = useState(
    window.electron.store.get('isInitialized')
  );

  const create = (password: string) => {
    setInitialized(true);
  };

  const exit = () => window.electron.store.set('quit', null);

  return (
    <CreatePasswordPopup visible={!initialized} create={create} exit={exit} />
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
