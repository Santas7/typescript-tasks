import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useGetContactsQuery } from '../services/api';

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const { data: contacts, isLoading } = useGetContactsQuery();
  const [contact, setContact] = useState<ContactDto | undefined>();

  useEffect(() => {
    if (contacts && contactId) {
      setContact(contacts.find(({ id }: { id: string }) => String(id) === String(contactId)));
    }
  }, [contactId, contacts]);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Row xxl={3}>
      <Col className="mx-auto">
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};