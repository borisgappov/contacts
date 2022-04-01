import { Form, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/autocomplete';
import { SimpleItem } from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { CustomRule } from 'devextreme-react/validator';
import validationEngine from 'devextreme/ui/validation_engine';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Encryptor from 'renderer/shared/encryptor';
import { setData, setHash } from 'renderer/store/contactsSlice';
import Brand from './Brand';

export default function EnterPasswordPopup() {
  const dispatch = useDispatch();
  const model = { password: '' };
  const [passwordValid, setPasswordValid] = useState(true);

  const enterPasswordClick = () => {
    const data = window.electron.data.get('loadData').toString();
    const hash = Encryptor.getHash(model.password);
    const contacts = Encryptor.decrypt(data, hash);
    if (contacts) {
      validationEngine.resetGroup('passwordData');
      dispatch(setData(contacts));
      dispatch(setHash(hash));
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <Popup
      visible
      showTitle={false}
      dragEnabled={false}
      closeOnOutsideClick={false}
      showCloseButton={false}
      width={400}
      height={230}
    >
      <Position at="center" my="center" of={window} />
      <Brand />
      <h3>Please enter a password</h3>
      <Form formData={model} readOnly={false} validationGroup="passwordData">
        <SimpleItem
          editorType="dxTextBox"
          dataField="password"
          editorOptions={{
            mode: 'password',
            onEnterKey: () => enterPasswordClick(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onKeyDown: (e: any) =>
              e.component.option('validationStatus', 'valid'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onInitialized: (e: any) =>
              setTimeout(() => e.component.focus(), 500),
          }}
        >
          <CustomRule
            validationCallback={() => passwordValid}
            message="The password you entered is wrong, please try again"
          />
        </SimpleItem>
      </Form>
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{
          horizontalAlignment: 'left',
          text: 'Exit',
          onClick: () => window.electron.data.set('quit', null),
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text: 'Enter password',
          type: 'success',
          validationGroup: 'passwordData',
          onClick: () => enterPasswordClick(),
        }}
      />
    </Popup>
  );
}
