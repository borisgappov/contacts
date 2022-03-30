import { IContact } from './contact';

export interface IContactsState {
  items: IContact[];
  initialized: boolean;
  authenticated: boolean;
}
