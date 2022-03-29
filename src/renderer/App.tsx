import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { Button } from 'devextreme-react';
import InitialPopup from './InitialPopup';

const Hello = () => {
  const sayHelloWorld = () => {
    const res = window.electron.store.get('isInitialized');
    console.log(res);
    // window.electron.store.set('abc', 33);
    // const res = window.electron.store.get('abc');
    // console.log(res);
  };

  return (
    <div>
      <InitialPopup />
      {/* <Button text="Click me" onClick={sayHelloWorld} /> */}
    </div>
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
