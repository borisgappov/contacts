import { createSlice } from '@reduxjs/toolkit';
import { IContactsState } from '../models/contacts-state';

const initialState: IContactsState = {
  items: [],
  initialized: false,
  authenticated: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    append: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    set: (state, action) => {
      state.items = action.payload;
    },
    remove: (state, action) => {
      state.items = [...state.items.filter((e) => e.id !== action.payload.id)];
    },
    update: (state, action) => {
      const item = action.payload;
      const changed = state.items.find((e) => e.id === item.id);
      if (changed) {
        Object.assign(changed, item);
      }
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { append, remove, set, update, setInitialized, setAuthenticated } =
  contactsSlice.actions;

export const selectItems = (state: { contacts: IContactsState }) =>
  state.contacts.items;

export const selectAuthenticated = (state: { contacts: IContactsState }) =>
  state.contacts.authenticated;

export const selectInitialized = (state: { contacts: IContactsState }) =>
  state.contacts.initialized;

export default contactsSlice.reducer;
