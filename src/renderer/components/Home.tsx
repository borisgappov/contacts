import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectAuthenticated,
  selectInitialized,
} from 'renderer/store/contactsSlice';
import CreatePasswordPopup from './CreatePasswordPopup';
import EnterPasswordPopup from './EnterPasswordPopup';

export default function Home() {
  const initialized = useSelector(selectInitialized);
  const authenticated = useSelector(selectAuthenticated);

  if (initialized) {
    return authenticated ? <Navigate to="/contacts" /> : <EnterPasswordPopup />;
  }
  return <CreatePasswordPopup />;
}
