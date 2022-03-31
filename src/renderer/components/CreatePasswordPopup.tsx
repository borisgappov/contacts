import { Form, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/autocomplete';
import { PatternRule } from 'devextreme-react/data-grid';
import {
  CompareRule,
  Label,
  RequiredRule,
  SimpleItem,
} from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Utils from 'renderer/shared/utils';
import { set, setHash, setInitialized } from 'renderer/store/contactsSlice';
import styled from 'styled-components';
import Brand from './Brand';

const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CreatePasswordPopup() {
  const dispatch = useDispatch();
  const passwordRequirements = Utils.getPasswordRequirements();
  const model = { password: '1qaz@WSXZx', confirm: '1qaz@WSXZx' };
  const formInstance: React.RefObject<Form> = useRef(null);

  const createPasswordClick = () => {
    if (formInstance.current?.instance.validate().isValid) {
      const items = Utils.getSampleData();
      const hash = Utils.getHash(model.password);
      formInstance.current.instance.resetValues();
      dispatch(set(items));
      dispatch(setInitialized(true));
      dispatch(setHash(hash));
      window.electron.store.set('saveData', Utils.encrypt(items, hash));
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
      height={340}
    >
      <Position at="center" my="center" of={window} />
      <BrandContainer>
        <Brand />
      </BrandContainer>
      <h3>Please create a password</h3>
      <p>
        The data will be encrypted using this password. Please do not forget it,
        as it is not stored anywhere and if it is lost, the data will be
        impossible to recover.
      </p>
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
          </SimpleItem>
          <SimpleItem
            editorType="dxTextBox"
            dataField="confirm"
            colSpan={2}
            editorOptions={{ mode: 'password' }}
          >
            <Label text="Confirm Password" />
            <RequiredRule message="Confirm Password is required" />
            <PatternRule
              pattern={passwordRequirements.pattern}
              message={passwordRequirements.message}
            />
            <CompareRule
              message="Password and Confirm Password do not match"
              comparisonTarget={() => model.password}
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
          text: 'Create password',
          type: 'success',
          validationGroup: 'passwordData',
          onClick: () => createPasswordClick(),
        }}
      />
    </Popup>
  );
}
