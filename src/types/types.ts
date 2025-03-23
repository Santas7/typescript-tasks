import { ContactDto } from './dto/ContactDto';
import { GroupContactsDto } from './dto/GroupContactsDto';

export interface FilterFormValues {
  name?: string;
  groupId?: number;
}

export interface ContactsState {
  contacts: ContactDto[];
  filteredContacts: ContactDto[];
  favorites: string[];
  filters: FilterFormValues;
  loading: boolean;
  error: string | null;
}

export interface GroupsState {
  groups: GroupContactsDto[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  contacts: ContactsState;
  groups: GroupsState;
}