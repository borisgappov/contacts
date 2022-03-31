import { Form, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/autocomplete';
import { PatternRule } from 'devextreme-react/data-grid';
import { RequiredRule, SimpleItem } from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { CustomRule } from 'devextreme-react/validator';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Utils from 'renderer/shared/utils';
import { set, setHash } from 'renderer/store/contactsSlice';
import styled from 'styled-components';
import Brand from './Brand';

const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function EnterPasswordPopup() {
  const dispatch = useDispatch();
  const passwordRequirements = Utils.getPasswordRequirements();
  const model = { password: '1qaz@WSXZx' };
  const [passwordValid, setPasswordValid] = useState(true);
  const formInstance: React.RefObject<Form> = useRef(null);

  const enterPasswordClick = () => {
    if (formInstance.current?.instance.validate().isValid) {
      const data = window.electron.store.get('loadData').toString();
      const hash = Utils.getHash(model.password);
      const contacts = Utils.decrypt(data, hash);
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
      <BrandContainer>
        <Brand />
      </BrandContainer>
      <h3>Please enter a password</h3>
      <form action="your-action">
        <Form
          ref={formInstance}
          formData={model}
          readOnly={false}
          validationGroup="passwordData"
          colCount={2}
          showValidationSummary
        >
          <SimpleItem
            editorType="dxTextBox"
            dataField="password"
            colSpan={2}
            editorOptions={{ mode: 'password' }}
          >
            <RequiredRule message="Password is required" />
            <PatternRule
              pattern={passwordRequirements.pattern}
              message={passwordRequirements.message}
            />
            <CustomRule
              validationCallback={() => passwordValid}
              message="The password you entered is wrong, please try again"
            />
          </SimpleItem>
        </Form>
      </form>
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{
          horizontalAlignment: 'left',
          text: 'Exit',
          onClick: () => window.electron.store.set('quit', null),
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