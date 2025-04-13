import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactDto } from '../types/dto/ContactDto';
import { GroupContactsDto } from '../types/dto/GroupContactsDto';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fs04.gcfiles.net/fileservice/file/download/a/177331/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => 'sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json',
    }),
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => 'sc/0/h/f1e98b0d70d16a909818b03b72415733.json',
    }),
  }),
});

export const { useGetContactsQuery, useGetGroupsQuery } = contactsApi;