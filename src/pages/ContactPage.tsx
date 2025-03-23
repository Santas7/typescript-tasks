import React, {FC, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';

import {useSelector} from 'react-redux';
import { RootState } from '../types/types';

export const ContactPage: FC = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const contacts = useSelector((state: RootState) => {
    
    return state.contacts.contacts
  });
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(
      () => contacts.find(({id}) => id === contactId)
    );
  }, [contactId]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
