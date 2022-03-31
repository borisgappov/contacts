import { useDispatch, useSelector } from 'react-redux';
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  Scrolling,
  Editing,
  Popup,
  Form,
  ColumnChooser,
  Toolbar,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { IContact } from 'renderer/models/contact';
import { Options } from 'devextreme-react/autocomplete';
import { append, update, remove, selectItems } from '../store/contactsSlice';
import Brand from './Brand';

export default function Contacts() {
  const items = useSelector(selectItems);

  const dispatch = useDispatch();

  const dataSource = new DataSource({
    store: new ArrayStore({
      data: [
        ...items.map((e) => {
          return { ...e };
        }),
      ],
      onInserted: (values, key) => {
        const lastItem = items.reduce(
          (p: IContact, c: IContact) => (p.id > c.id ? p : c),
          {} as IContact
        );
        values.id = lastItem ? lastItem.id + 1 : 1;
        dispatch(append(values));
      },
      onUpdated: (key, values) => {
        dispatch(update(values));
        console.log('store, updated', key, values);
      },
      onRemoved: (key) => {
        dispatch(remove(key));
        console.log('store, removed', key);
      },
      onLoaded: (result) => {
        console.log('store, loaded', result);
      },
      onModified: () => {
        console.log('store, modifyed', dataSource.store());
      },
    }),
    key: 'id',
  });

  return (
    <DataGrid
      dataSource={dataSource}
      keyExpr="id"
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
        {/* <Item name="separator" /> */}
        <Item
          location="after"
          showText="inMenu"
          widget="dxButton"
          locateInMenu="auto"
        >
          <Options
            icon="import"
            hint="Import sample data"
            text="Import sample data"
          />
          {/* <Button icon="import" hint="Import sample data" text="Import sample data" /> */}
        </Item>
        <Item
          location="after"
          showText="inMenu"
          widget="dxButton"
          locateInMenu="auto"
        >
          <Options icon="clear" hint="Clear" text="Clear" />
        </Item>
      </Toolbar>
    </DataGrid>
  );
}
