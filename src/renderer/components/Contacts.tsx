import { useSelector } from 'react-redux';
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  Scrolling,
} from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { selectItems } from '../store/contactsSlice';

export default function Contacts() {
  const items = useSelector(selectItems);

  return (
    <DataGrid
      dataSource={
        new DataSource({
          store: new ArrayStore({
            data: items,
          }),
          key: 'ID',
        })
      }
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

      <Column dataField="name" />
      <Column dataField="phone" />
      <Column dataField="email" />
      <Column dataField="address" />
    </DataGrid>
  );
}
