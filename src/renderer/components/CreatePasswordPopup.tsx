import { Form, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/autocomplete';
import {
  CompareRule,
  Label,
  RequiredRule,
  SimpleItem,
} from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { InitializedEvent } from 'devextreme/ui/form';
import styled from 'styled-components';
import Brand from './Brand';

const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CreatePasswordPopup(props: {
  visible: boolean;
  create: (password: string) => void;
  exit: () => void;
}) {
  const model = {
    password: '',
    confirm: '',
  };

  const { visible, create, exit } = props;

  // eslint-disable-next-line
  let formInstance: any;

  const initFormEvent = (e: InitializedEvent) => {
    formInstance = e.component?.instance();
  };

  const createPasswordClick = () => {
    if (formInstance.validate().isValid) {
      const { password } = { ...model };
      formInstance.resetValues();
      create(password);
    }
  };

  return (
    <Popup
      visible={visible}
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
          formData={model}
          readOnly={false}
          validationGroup="passwordData"
          colCount={2}
          onInitialized={initFormEvent}
        >
          <SimpleItem
            editorType="dxTextBox"
            dataField="password"
            colSpan={2}
            editorOptions={{ mode: 'password' }}
          >
            <RequiredRule message="Password is required" />
          </SimpleItem>
          <SimpleItem
            editorType="dxTextBox"
            dataField="confirm"
            colSpan={2}
            editorOptions={{ mode: 'password' }}
          >
            <Label text="Confirm Password" />
            <RequiredRule message="Confirm Password is required" />
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
          onClick: () => exit(),
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
