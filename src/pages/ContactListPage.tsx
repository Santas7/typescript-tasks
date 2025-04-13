import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { contactsStore } from '../stores/ContactsStore';

const ContactListPage = observer(() => {
  useEffect(() => {
    contactsStore.fetchContacts();
    contactsStore.fetchGroups();
  }, []);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    const updatedFv: FilterFormValues = {
      ...fv,
      groupId: String(fv.groupId),
      name: String(fv.name),
    };
    contactsStore.setFilters(updatedFv);
  };

  let displayedContacts = contactsStore.filteredContacts;
  if (contactsStore.filters.groupId) {
    const group = contactsStore.groups.find((g) => String(g.id) === String(contactsStore.filters.groupId));
    if (group) {
      displayedContacts = contactsStore.filteredContacts.filter((contact) =>
        group.contactIds.includes(contact.id)
      );
    }
  }

  if (contactsStore.loading) return <p>Загрузка...</p>;
  if (contactsStore.error) return <p>Ошибка: {contactsStore.error}</p>;

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={contactsStore.groups} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {displayedContacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
              <button
                onClick={() => contactsStore.toggleFavorite(contact.id)}
                style={{ marginTop: '8px' }}
              >
                {contactsStore.favorites.includes(contact.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
              </button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});

export default React.memo(ContactListPage);