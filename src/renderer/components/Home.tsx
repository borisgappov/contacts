import { useNavigate } from 'react-router-dom';
import {
  selectInitialized,
  set,
  setAuthenticated,
  setInitialized,
} from 'renderer/store/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import getSampleData from 'renderer/shared/utils';
import CreatePasswordPopup from './CreatePasswordPopup';

export default function Home() {
  const navigate = useNavigate();

  const initialized = useSelector(selectInitialized);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const create = (password: string) => {
    dispatch(setInitialized(true));
    dispatch(set(getSampleData()));
    dispatch(setAuthenticated(true));
    setTimeout(() => navigate('contacts'));
  };

  const exit = () => window.electron.store.set('quit', null);

  return (
    <>
      Home component
      <CreatePasswordPopup visible={!initialized} create={create} exit={exit} />
    </>
  );
}
