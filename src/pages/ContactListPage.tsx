import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { setFilters, toggleFavorite } from '../redux/actions/contactsActions';
import { useGetContactsQuery, useGetGroupsQuery } from '../services/api';
import { RootState } from '../types/types';
import { AppDispatch } from '../redux/store';
import { ContactDto } from 'src/types/dto/ContactDto';

export const ContactListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredContacts, filters, favorites } = useSelector((state: RootState) => state.contacts);
  const { data: contacts, isLoading: contactsLoading, error: contactsError } = useGetContactsQuery();
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGetGroupsQuery();

  useEffect(() => {
    if (contacts) {
      dispatch(setFilters({ filters: {}, contacts }));
    }
  }, [contacts, dispatch]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    const updatedFv: FilterFormValues = {
      ...fv,
      groupId: String(fv.groupId),
      name: String(fv.name),
    };
    dispatch(setFilters({ filters: updatedFv, contacts: contacts! }));
  };

  let displayedContacts = filteredContacts;
  if (filters.groupId && groups) {
    const group = groups.find((g) => String(g.id) === String(filters.groupId));
    if (group) {
      displayedContacts = filteredContacts.filter((contact) =>
        group.contactIds.includes(contact.id)
      );
    }
  }

  if (contactsLoading || groupsLoading) return <p>Загрузка...</p>;
  if (contactsError || groupsError) return <p>Ошибка загрузки данных</p>;

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groups || []} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {displayedContacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
              <button
                onClick={() => dispatch(toggleFavorite(contact.id))}
                style={{ marginTop: '8px' }}
              >
                {favorites.includes(contact.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
              </button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});