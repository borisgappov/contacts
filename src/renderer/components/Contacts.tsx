/* eslint promise/catch-or-return: off, promise/always-return: off */
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'devextreme-react';
import { Options } from 'devextreme-react/autocomplete';
import DataGrid, {
  Column,
  ColumnChooser,
  Editing,
  EmailRule,
  FilterBuilderPopup,
  FilterPanel,
  FilterRow,
  Form,
  HeaderFilter,
  Pager,
  Paging,
  Popup,
  SearchPanel,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Item, RequiredRule } from 'devextreme-react/form';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Encryptor from 'renderer/shared/encryptor';
import Utils from 'renderer/shared/utils';
import {
  append,
  remove,
  selectAuthenticated,
  selectHash,
  selectItems,
  setData,
  setHash,
  setInitialized,
  update,
} from '../store/contactsSlice';
import Brand from './Brand';
import Message from './Message';

export default function Contacts() {
  const items = useSelector(selectItems);
  const hash = useSelector(selectHash);
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      window.electron.data.set('saveData', Encryptor.encrypt(items, hash));
    }
  }, [authenticated, hash, items]);

  const logOut = () => {
    dispatch(setHash(''));
    dispatch(setData([]));
    navigate('/');
  };

  const confirm = (text: string): Promise<boolean> =>
    Utils.confirm(renderToString(<Message text={text} />));

  const importData = () => {
    confirm(`All data will be replaced with test data.
        Are you sure you want to import test data?`).then(
      (result) => result && dispatch(setData(Utils.getSampleData()))
    );
  };

  const reset = () => {
    confirm(
      `All data will be deleted and the application will return to its initial state.
      Are you sure you want to reset?`
    ).then((result) => {
      if (result) {
        window.electron.data.set('reset', null);
        dispatch(setInitialized(false));
        logOut();
      }
    });
  };

  const clear = () => {
    confirm('All data will be deleted. Are you sure you want to clear?').then(
      (result) => result && dispatch(setData([]))
    );
  };

  const dataSource = new DataSource({
    store: new ArrayStore({
      data: [...items.map((e) => ({ ...e }))],
      onInserted: (e) => dispatch(append({ ...e, id: Utils.getNextId(items) })),
      onUpdated: (e) => dispatch(update(e)),
      onRemoved: (e) => dispatch(remove(e)),
    }),
    key: 'id',
  });

  const gridRef: React.RefObject<DataGrid> = useRef(null);

  return (
    <DataGrid
      ref={gridRef}
      dataSource={dataSource}
      showBorders
      columnHidingEnabled
      columnAutoWidth
      onEditingStart={() => {
        gridRef.current?.instance.option('editing.popup.title', 'Edit Contact');
      }}
      onInitNewRow={() => {
        gridRef.current?.instance.option('editing.popup.title', 'Add Contact');
      }}
    >
      <FilterRow visible />
      <FilterPanel visible />
      <FilterBuilderPopup />
      <HeaderFilter visible />
      <ColumnChooser enabled />
      <SearchPanel visible />
      <Paging defaultPageSize={15} />
      <Pager
        visible
        allowedPageSizes
        showPageSizeSelector
        showInfo
        showNavigationButtons
      />

      <Editing mode="popup" allowUpdating allowAdding allowDeleting>
        <Popup showTitle width={500} height={460} />
        <Form colCount={1}>
          <Item itemType="group">
            <Item dataField="name">
              <RequiredRule message="Name is required" />
            </Item>
            <Item dataField="phone" editorOptions={{ mask: '000-000-0000' }}>
              <RequiredRule message="Phone is required" />
            </Item>
            <Item dataField="email" editorOptions={{ mode: 'email' }}>
              <RequiredRule message="Email is required" />
              <EmailRule />
            </Item>
            <Item
              dataField="address"
              editorType="dxTextArea"
              editorOptions={{ height: 150 }}
            />
          </Item>
        </Form>
      </Editing>

      <Column dataField="name" minWidth={150} />
      <Column dataField="phone" />
      <Column dataField="email" />
      <Column dataField="address" />

      <Toolbar>
        <Item location="before">
          <Brand />
        </Item>
        <Item location="after" name="addRowButton" />
        <Item location="after" name="searchPanel" locateInMenu="auto" />
        <Item location="after" name="columnChooserButton" locateInMenu="auto" />
        <Item location="after">
          <Button width={36} height={36} hint="Log Out" onClick={logOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ fontSize: 18 }}
            />
          </Button>
        </Item>

        <Item
          location="after"
          widget="dxButton"
          locateInMenu="always"
          onClick={importData}
        >
          <Options icon="import" text="Import sample data" />
        </Item>
        <Item
          location="after"
          widget="dxButton"
          locateInMenu="always"
          onClick={clear}
        >
          <Options icon="trash" text="Clear data" />
        </Item>
        <Item
          location="after"
          widget="dxButton"
          locateInMenu="always"
          onClick={reset}
        >
          <Options icon="remove" text="Reset" />
        </Item>
      </Toolbar>
    </DataGrid>
  );
}
