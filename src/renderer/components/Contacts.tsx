import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'devextreme-react';
import DataGrid, {
  Column,
  ColumnChooser,
  Editing,
  FilterBuilderPopup,
  FilterPanel,
  FilterRow,
  Form,
  HeaderFilter,
  Popup,
  SearchPanel,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Item, RequiredRule } from 'devextreme-react/form';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Utils from 'renderer/shared/utils';
import styled from 'styled-components';
import {
  append,
  remove,
  selectHash,
  selectItems,
  set,
  setHash,
  update,
} from '../store/contactsSlice';
import Brand from './Brand';

const FaIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`;

export default function Contacts() {
  const items = useSelector(selectItems);
  const hash = useSelector(selectHash);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) window.electron.store.set('saveData', Utils.encrypt(items, hash));
  }, [hash, items]);

  const logOut = () => {
    dispatch(setHash(''));
    dispatch(set([]));
    navigate('/');
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
            <FaIcon icon={faArrowRightFromBracket} />
          </Button>
        </Item>
      </Toolbar>
    </DataGrid>
  );
}
