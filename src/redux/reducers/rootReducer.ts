import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';
import groupsReducer from './groupsReducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
});

export default rootReducer;