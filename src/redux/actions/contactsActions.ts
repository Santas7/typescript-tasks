import { ContactDto } from '../../types/dto/ContactDto';
import { ThunkAction } from 'redux-thunk';
import { FilterFormValues, RootState } from '../../types/types';
import { AnyAction } from 'redux';
import { DATA_CONTACT } from 'src/__data__';

export const fetchContactsRequest = () => ({ type: 'FETCH_CONTACTS_REQUEST' } as const);
export const fetchContactsSuccess = (contacts: ContactDto[]) =>
  ({ type: 'FETCH_CONTACTS_SUCCESS', payload: contacts } as const);
export const fetchContactsFailure = (error: string) =>
  ({ type: 'FETCH_CONTACTS_FAILURE', payload: error } as const);
export const toggleFavorite = (contactId: string) =>
  ({ type: 'TOGGLE_FAVORITE', payload: contactId } as const);
export const setFilters = (filters: FilterFormValues) =>
  ({ type: 'SET_FILTERS', payload: filters } as const);

export const fetchContacts = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    setTimeout(() => {
      try {
        // Имитация загрузки с сервера
        const mockContacts: ContactDto[] = DATA_CONTACT.map((contact) => ({
          ...contact 
        }));
        dispatch(fetchContactsSuccess(mockContacts));
      } catch (error) {
        dispatch(fetchContactsFailure('Ошибка загрузки контактов'));
      }
    }, 1000);
  };
};