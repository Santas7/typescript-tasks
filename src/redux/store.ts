import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { thunk, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import rootReducer from './reducers/rootReducer';
import { RootState } from '../types/types';

type AppThunkDispatch = ThunkDispatch<RootState, never, AnyAction>;


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type AppDispatch = AppThunkDispatch;
export type AppStore = typeof store;