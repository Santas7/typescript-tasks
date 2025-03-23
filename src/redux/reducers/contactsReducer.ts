import { ContactsState, FilterFormValues } from '../../types/types';
import { DATA_CONTACT } from 'src/__data__';

import { ContactDto } from '../../types/dto/ContactDto';

const loadFavoritesFromLocalStorage = (): string[] => {
  try {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Ошибка при загрузке favorites из localStorage:', error);
    return [];
  }
};

const initialState: ContactsState = {
  contacts: DATA_CONTACT,
  filteredContacts: [],
  favorites: loadFavoritesFromLocalStorage(), 
  filters: {},
  loading: false,
  error: null,
};

console.log("initialState: ", initialState);

type Action =
  | { type: 'FETCH_CONTACTS_REQUEST' }
  | { type: 'FETCH_CONTACTS_SUCCESS'; payload: ContactDto[] }
  | { type: 'FETCH_CONTACTS_FAILURE'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'SET_FILTERS'; payload: FilterFormValues };

const contactsReducer = (state = initialState, action: Action): ContactsState => {
  switch (action.type) {
    case 'FETCH_CONTACTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CONTACTS_SUCCESS':
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        filteredContacts: action.payload,
      };
    case 'FETCH_CONTACTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'TOGGLE_FAVORITE':
      console.log('TOGGLE_FAVORITE');
      console.log('State before:', state);
      console.log('Action:', action);
      const contactId = action.payload;
      const isFavorite = state.favorites.includes(String(contactId));
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => String(id) !== String(contactId))
        : [...state.favorites, contactId];
      console.log('New favorites:', newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites as string[],
      };
    case 'SET_FILTERS': {
      const filters = action.payload;
      let filteredContacts = [...state.contacts];

      if (filters.name) {
        const fvName = filters.name.toLowerCase();
        filteredContacts = filteredContacts.filter(({ name }) =>
          name.toLowerCase().includes(fvName)
        );
      }

      return {
        ...state,
        filters,
        filteredContacts,
      };
    }
    default:
      return state;
  }
};

export default contactsReducer;