import { Form, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/autocomplete';
import { RequiredRule, SimpleItem } from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { CustomRule } from 'devextreme-react/validator';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Encryptor from 'renderer/shared/encryptor';
import { set, setHash } from 'renderer/store/contactsSlice';
import Brand from './Brand';

export default function EnterPasswordPopup() {
  const dispatch = useDispatch();
  const model = { password: '' };
  const [passwordValid, setPasswordValid] = useState(true);
  const formInstance: React.RefObject<Form> = useRef(null);

  const enterPasswordClick = () => {
    if (formInstance.current?.instance.validate().isValid) {
      const data = window.electron.data.get('loadData').toString();
      const hash = Encryptor.getHash(model.password);
      const contacts = Encryptor.decrypt(data, hash);
      if (contacts) {
        formInstance.current.instance.resetValues();
        dispatch(set(contacts));
        dispatch(setHash(hash));
      } else {
        setPasswordValid(false);
      }
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
      <Form
        ref={formInstance}
        formData={model}
        readOnly={false}
        validationGroup="passwordData"
        showValidationSummary
      >
        <SimpleItem
          editorType="dxTextBox"
          dataField="password"
          editorOptions={{
            mode: 'password',
            onEnterKey: () => enterPasswordClick(),
            onKeyDown: () => setPasswordValid(true),
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
