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
    set: (state, action) => {
      state.items = action.payload;
    },
    append: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    update: (state, action) => {
      const items = [...state.items];
      const index = items.findIndex((e) => e.id === action.payload.id);
      if (index >= 0) {
        items[index] = { ...action.payload };
        state.items = items;
      }
    },
    remove: (state, action) => {
      state.items = [...state.items.filter((e) => e.id !== action.payload.id)];
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
