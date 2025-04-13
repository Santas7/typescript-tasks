import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactsState, FilterFormValues } from '../../types/types';
import { ContactDto } from '../../types/dto/ContactDto';

const loadFavoritesFromLocalStorage = (): string[] => {
  try {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    return [];
  }
};

const initialState: ContactsState = {
  filteredContacts: [],
  favorites: loadFavoritesFromLocalStorage(),
  filters: {},
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const contactId = action.payload;
      const isFavorite = state.favorites.includes(contactId);
      state.favorites = isFavorite
        ? state.favorites.filter((id) => id !== contactId)
        : [...state.favorites, contactId];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters(state, action: PayloadAction<{ filters: FilterFormValues; contacts: ContactDto[] }>) {
      const { filters, contacts } = action.payload;
      state.filters = filters;
      let filteredContacts = [...contacts];

      if (filters.name) {
        const fvName = filters.name.toLowerCase();
        filteredContacts = filteredContacts.filter(({ name }) =>
          name.toLowerCase().includes(fvName)
        );
      }

      state.filteredContacts = filteredContacts;
    },
  },
});

export const { toggleFavorite, setFilters } = contactsSlice.actions;
export default contactsSlice.reducer;