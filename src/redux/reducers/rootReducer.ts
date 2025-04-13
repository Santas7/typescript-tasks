import { combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './contactsReducer';
import groupsReducer from './groupsReducer';
import { contactsApi } from '../../services/api';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
});

export default rootReducer;