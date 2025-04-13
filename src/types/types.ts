import { ContactDto } from './dto/ContactDto';
import { GroupContactsDto } from './dto/GroupContactsDto';

export interface FilterFormValues {
  name?: string;
  groupId?: string; // Changed from number to string to match GroupContactsDto['id']
}

export interface ContactsState {
  filteredContacts: ContactDto[];
  favorites: string[];
  filters: FilterFormValues;
}

export interface GroupsState {}

export interface RootState {
  contacts: ContactsState;
  groups: GroupsState;
  [key: string]: any;
}