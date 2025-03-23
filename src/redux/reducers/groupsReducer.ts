import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupsState } from '../../types/types';

const initialState: GroupsState = {
  groups: [],
  loading: false,
  error: null,
};

type Action =
  | { type: 'FETCH_GROUPS_REQUEST' }
  | { type: 'FETCH_GROUPS_SUCCESS'; payload: GroupContactsDto[] }
  | { type: 'FETCH_GROUPS_FAILURE'; payload: string };

const groupsReducer = (state = initialState, action: Action): GroupsState => {
  switch (action.type) {
    case 'FETCH_GROUPS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_GROUPS_SUCCESS':
      return { ...state, loading: false, groups: action.payload };
    case 'FETCH_GROUPS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default groupsReducer;