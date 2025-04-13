import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { ContactDto } from 'src/types/dto/ContactDto';
import { contactsStore } from '../stores/ContactsStore';

export const FavoritListPage: React.FC = observer(() => {
  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  const favoriteContacts = contactsStore.contacts.filter((contact) => contactsStore.favorites.includes(contact.id));

  if (contactsStore.loading) return <p>Загрузка...</p>;
  if (contactsStore.error) return <p>Ошибка: {contactsStore.error}</p>;

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
});