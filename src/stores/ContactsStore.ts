import { makeAutoObservable, runInAction } from 'mobx';
import { ContactDto } from '../types/dto/ContactDto';
import { GroupContactsDto } from '../types/dto/GroupContactsDto';
import { FilterFormValues } from '../types/types';

export class ContactsStore {
  contacts: ContactDto[] = [];
  groups: GroupContactsDto[] = [];
  filteredContacts: ContactDto[] = [];
  favorites: string[] = [];
  filters: FilterFormValues = {};
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFavoritesFromLocalStorage();
  }

  private loadFavoritesFromLocalStorage() {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      this.favorites = [];
    }
  }

  async fetchContacts() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch('https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json');
      const data: ContactDto[] = await response.json();
      runInAction(() => {
        this.contacts = data;
        this.filteredContacts = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Ошибка загрузки контактов';
        this.loading = false;
      });
    }
  }

  async fetchGroups() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch('https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/0/h/f1e98b0d70d16a909818b03b72415733.json');
      const data: GroupContactsDto[] = await response.json();
      runInAction(() => {
        this.groups = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Ошибка загрузки групп';
        this.loading = false;
      });
    }
  }

  toggleFavorite(contactId: string) {
    const isFavorite = this.favorites.includes(contactId);
    this.favorites = isFavorite
      ? this.favorites.filter((id) => id !== contactId)
      : [...this.favorites, contactId];
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  setFilters(filters: FilterFormValues) {
    this.filters = filters;
    let filteredContacts = [...this.contacts];

    if (filters.name) {
      const fvName = filters.name.toLowerCase();
      filteredContacts = filteredContacts.filter(({ name }) =>
        name.toLowerCase().includes(fvName)
      );
    }

    this.filteredContacts = filteredContacts;
  }
}

export const contactsStore = new ContactsStore();