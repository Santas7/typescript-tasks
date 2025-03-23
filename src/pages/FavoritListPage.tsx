import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { fetchContacts } from '../redux/actions/contactsActions';
import { RootState } from '../types/types';
import { AppDispatch } from '../redux/store';
import { ContactDto } from 'src/types/dto/ContactDto';

export const FavoritListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, favorites, loading, error } = useSelector((state: RootState) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const favoriteContacts = contacts.filter((contact) => favorites.includes(contact.id));

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.length === 0 ? (
        <p>Нет избранных контактов</p>
      ) : (
        favoriteContacts.map((contact: ContactDto) => (
          <Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>
        ))
      )}
    </Row>
  );
};
