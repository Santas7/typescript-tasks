import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../types/types';
import { AnyAction } from 'redux';
import { DATA_GROUP_CONTACT } from 'src/__data__';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const fetchGroupsRequest = () => ({ type: 'FETCH_GROUPS_REQUEST' } as const);
export const fetchGroupsSuccess = (groups: GroupContactsDto[]) =>
  ({ type: 'FETCH_GROUPS_SUCCESS', payload: groups } as const);
export const fetchGroupsFailure = (error: string) =>
  ({ type: 'FETCH_GROUPS_FAILURE', payload: error } as const);

export const fetchGroups = (): ThunkAction<void, RootState, never, AnyAction> => {
  return (dispatch) => {
    dispatch(fetchGroupsRequest());
    setTimeout(() => {
      try {
        const mockGroups: GroupContactsDto[] = DATA_GROUP_CONTACT.map((group) => ({
          ...group
        }));
        dispatch(fetchGroupsSuccess(mockGroups));
      } catch (error) {
        dispatch(fetchGroupsFailure('Ошибка загрузки групп'));
      }
    }, 1000);
  };
};