import { Form, Popup } from 'devextreme-react';
import {
  ButtonItem,
  CompareRule,
  Label,
  RequiredRule,
  SimpleItem,
} from 'devextreme-react/form';
import { Position } from 'devextreme-react/popup';
import { FormEvent } from 'react';

export default function WelcomePopup(props: any) {
  const model = { password: '' };

  const { visible, create, exit } = props;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create(model.password);
  };

  return (
    <Popup
      visible={visible}
      showTitle
      dragEnabled={false}
      closeOnOutsideClick={false}
      showCloseButton={false}
      title="Please create a password"
      width={400}
      height={340}
    >
      <Position at="center" my="center" of={window} />
      <p>
        The data will be encrypted using this password. Please do not forget it,
        as it is not stored anywhere and if it is lost, the data will be
        impossible to recover.
      </p>
      <form action="your-action" onSubmit={handleSubmit}>
        <Form formData={model} readOnly={false} validationGroup="passwordData">
          <SimpleItem
            dataField="password"
            editorType="dxTextBox"
            editorOptions={{ mode: 'password' }}
          >
            <RequiredRule message="Password is required" />
          </SimpleItem>
          <SimpleItem
            editorType="dxTextBox"
            editorOptions={{ mode: 'password' }}
          >
            <Label text="Confirm Password" />
            <RequiredRule message="Confirm Password is required" />
            <CompareRule
              message="Password and Confirm Password do not match"
              comparisonTarget={() => model.password}
            />
          </SimpleItem>
          <ButtonItem
            horizontalAlignment="left"
            buttonOptions={{
              text: 'Exit',
              onClick: () => exit(),
            }}
          />
          <ButtonItem
            horizontalAlignment="right"
            buttonOptions={{
              text: 'Create password',
              type: 'success',
              useSubmitBehavior: true,
            }}
          />
        </Form>
      </form>
    </Popup>
  );
}
