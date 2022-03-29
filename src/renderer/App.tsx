import 'devextreme/dist/css/dx.light.css';
import { useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomePopup from './WelcomePopup';

const Hello = () => {
  const [initialized, setInitialized] = useState(
    window.electron.store.get('isInitialized')
  );

  const create = (password: string) => {
    console.log(password);
    setInitialized(true);
  };

  const exit = () => {
    setInitialized(true);
  };

  return (
    <>
      <WelcomePopup visible={!initialized} create={create} exit={exit} />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
