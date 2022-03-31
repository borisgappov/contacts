import {
  faArrowRightFromBracket,
  faFileImport,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
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
  Scrolling,
  SearchPanel,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Utils from 'renderer/shared/utils';
import styled from 'styled-components';
import {
  append,
  remove,
  selectHash,
  selectItems,
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

  const dataSource = new DataSource({
    store: new ArrayStore({
      data: [
        ...items.map((e) => {
          return { ...e };
        }),
      ],
      onInserted: (e) => dispatch(append({ ...e, id: Utils.getNextId(items) })),
      onUpdated: (e) => dispatch(update(e)),
      onRemoved: (e) => dispatch(remove(e)),
    }),
    key: 'id',
  });

  return (
    <DataGrid
      visible
      dataSource={dataSource}
      showBorders
      columnHidingEnabled
      columnAutoWidth
    >
      <FilterRow visible />
      <FilterPanel visible />
      <FilterBuilderPopup />
      <HeaderFilter visible />
      <Scrolling mode="infinite" />
      <ColumnChooser enabled />
      <SearchPanel visible />

      <Editing mode="popup" allowUpdating allowAdding allowDeleting>
        <Popup title="Edit or Add Contact" showTitle width={400} height={525} />
        <Form>
          <Item itemType="group" colCount={2} colSpan={2}>
            <Item dataField="name" />
            <Item dataField="phone" />
            <Item dataField="email" />
            <Item dataField="address" editorType="dxTextArea" />
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
        <Item
          location="after"
          name="addRowButton"
          showText="inMenu"
          locateInMenu="auto"
        />
        <Item location="after" name="searchPanel" locateInMenu="auto" />
        <Item location="after" name="columnChooserButton" locateInMenu="auto" />
        <Item location="after">
          <Button
            width={36}
            height={36}
            hint="Import sample data"
            onClick={() => {}}
          >
            <FaIcon icon={faFileImport} />
          </Button>
        </Item>
        <Item location="after">
          <Button width={36} height={36} hint="Clear data" onClick={() => {}}>
            <FaIcon icon={faXmarkCircle} />
          </Button>
        </Item>
        <Item location="after">
          <Button
            width={36}
            height={36}
            hint="Log Out"
            onClick={() => {
              dispatch(setHash(''));
              navigate('/');
            }}
          >
            <FaIcon icon={faArrowRightFromBracket} />
          </Button>
        </Item>
      </Toolbar>
    </DataGrid>
  );
}
