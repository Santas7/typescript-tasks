import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useGetContactsQuery } from '../services/api';
import { RootState } from '../types/types';
import { ContactDto } from 'src/types/dto/ContactDto';

export const FavoritListPage: React.FC = () => {
  const { data: contacts, isLoading, error } = useGetContactsQuery();
  const { favorites } = useSelector((state: RootState) => state.contacts);

  const favoriteContacts = contacts?.filter((contact) => favorites.includes(contact.id)) || [];

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных</p>;

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