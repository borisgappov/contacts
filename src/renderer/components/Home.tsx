import { useSelector } from 'react-redux';
import {
  selectAuthenticated,
  selectInitialized,
} from 'renderer/store/contactsSlice';
import CreatePasswordPopup from './CreatePasswordPopup';
import EnterPasswordPopup from './EnterPasswordPopup';

export default function Home() {
  const initialized = useSelector(selectInitialized);
  const authenticated = useSelector(selectAuthenticated);

  return (
    <>
      {initialized ? (
        !authenticated && <EnterPasswordPopup />
      ) : (
        <CreatePasswordPopup />
      )}
    </>
  );
}
