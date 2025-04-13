import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { contactsStore } from '../stores/ContactsStore';

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto | undefined>();

  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  useEffect(() => {
    if (contactId) {
      setContact(contactsStore.contacts.find(({ id }) => id === contactId));
    }
  }, [contactId, contactsStore.contacts]);

  if (contactsStore.loading) return <p>Загрузка...</p>;
  if (contactsStore.error) return <p>Ошибка: {contactsStore.error}</p>;

  return (
    <Row xxl={3}>
      <Col className="mx-auto">
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};