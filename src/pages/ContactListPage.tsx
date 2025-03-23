import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { fetchContacts, setFilters, toggleFavorite } from '../redux/actions/contactsActions';
import { fetchGroups } from '../redux/actions/groupsActions';
import { RootState } from '../types/types';
import { AppDispatch } from '../redux/store';
import { ContactDto } from 'src/types/dto/ContactDto';

export const ContactListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredContacts, filters, favorites, loading, error } = useSelector((state: RootState) => state.contacts);
  const { groups } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchGroups());
  }, [dispatch]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    const updatedFv: FilterFormValues = {
      ...fv,
      groupId: String(fv.groupId),
      name: String(fv.name),

    };
    dispatch(setFilters(updatedFv as any));
  };

  let displayedContacts = filteredContacts;
  if (filters.groupId) {
    const group = groups.find((g) => {String(g.id) === String(filters.groupId)});
    if (group) {
      displayedContacts = filteredContacts.filter((contact) =>
        group.contactIds.includes(contact.id)
      );
    }
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groups} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {displayedContacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
              <button
                onClick={() => {
                  //console.log("click")
                  const ActionCreator = toggleFavorite(contact.id as string);
                  //console.log(ActionCreator)
                  return dispatch(ActionCreator)
                }}
                style={{ marginTop: '8px' }}
              >
                {favorites.includes(contact.id as string) ? 'Убрать из избранного' : 'Добавить в избранное'}
              </button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
