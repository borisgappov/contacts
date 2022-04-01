/* eslint promise/catch-or-return: off, promise/always-return: off */

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
import Encryptor from 'renderer/shared/encryptor';
import Utils from 'renderer/shared/utils';
import { setData, setHash, setInitialized } from 'renderer/store/contactsSlice';
import { IPreferences } from 'common/preferences';
import validationEngine from 'devextreme/ui/validation_engine';
import { renderToString } from 'react-dom/server';
import Brand from './Brand';
import Message from './Message';

export default function CreatePasswordPopup() {
  const dispatch = useDispatch();
  const passwordRequirements = Utils.getPasswordRequirements();
  const model = { password: '', confirm: '' };
  const formRef: React.RefObject<Form> = useRef(null);

  let hash: string;

  const loadTestData = () => {
    const items = Utils.getSampleData();
    dispatch(setData(items));
    window.electron.data.set('saveData', Encryptor.encrypt(items, hash));
  };

  const createPasswordClick = () => {
    if (formRef.current?.instance.validate().isValid) {
      hash = Encryptor.getHash(model.password);
      validationEngine.resetGroup('passwordData');
      dispatch(setInitialized(true));
      dispatch(setHash(hash));

      let preferences: IPreferences =
        window.electron.data.get('loadPreferences');
      if (preferences) {
        if (preferences.needTestData) {
          loadTestData();
        }
      } else {
        Utils.confirm(
          renderToString(<Message text="Would you like to load test data?" />)
        ).then((result) => {
          preferences = {} as IPreferences;
          if (result) {
            loadTestData();
            preferences.needTestData = true;
          } else {
            preferences.needTestData = false;
          }
          window.electron.data.set(
            'savePreferences',
            JSON.stringify(preferences)
          );
        });
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
      height={360}
    >
      <Position at="center" my="center" of={window} />
      <Brand />
      <h3>Please create a password</h3>
      <p>
        The data will be encrypted using this password. Please do not forget it,
        as it is not stored anywhere and if it is lost, the data will be
        impossible to recover.
      </p>

      <Form
        ref={formRef}
        formData={model}
        readOnly={false}
        validationGroup="passwordData"
        colCount={2}
      >
        <SimpleItem
          editorType="dxTextBox"
          dataField="password"
          colSpan={2}
          editorOptions={{
            mode: 'password',
            onEnterKey: () => createPasswordClick(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onKeyDown: (e: any) =>
              e.component.option('validationStatus', 'valid'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onInitialized: (e: any) =>
              setTimeout(() => e.component.focus(), 500),
          }}
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
          editorOptions={{
            mode: 'password',
            onEnterKey: () => createPasswordClick(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onKeyDown: (e: any) =>
              e.component.option('validationStatus', 'valid'),
          }}
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
          text: 'Create password',
          type: 'success',
          validationGroup: 'passwordData',
          onClick: () => createPasswordClick(),
        }}
      />
    </Popup>
  );
}
