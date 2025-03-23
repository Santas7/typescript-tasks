import {useState} from 'react';
import './MainApp.scss';
import {ThemeProvider} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';
import {FavoriteContactsDto} from 'src/types/dto/FavoriteContactsDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

import {useSelector} from 'react-redux';
import { RootState } from 'src/types/types';


export const MainApp = () => {
  // console.log(DATA_CONTACT)

  const contacts = useSelector((state: RootState) => {
    
    return state.contacts.contacts
  });

  const groups = useSelector((state: RootState) => {
    
    return state.groups.groups
  })

  // console.log(contacts)
  const favoriteContactsState = useState<FavoriteContactsDto>([
    contacts[0].id,
    contacts[1].id,
    contacts[2].id,
    contacts[3].id
  ]);
  const groupContactsState = useState<GroupContactsDto[]>(groups);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ContactListPage/>
            } />
            <Route path="contact">
              <Route index element={
                <ContactListPage/>
              } />
              <Route path=":contactId" element={
                <ContactPage/>
              } />
            </Route>
            <Route path="groups">
              <Route index element={
                <GroupListPage/>
              } />
              <Route path=":groupId" element={
                <GroupPage/>
              } />
            </Route>
            <Route path="favorit" element={
              <FavoritListPage/>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
