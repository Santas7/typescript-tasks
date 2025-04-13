import { memo, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { contactsStore } from '../stores/ContactsStore';

const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto | undefined>();
  const [filteredContacts, setContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    contactsStore.fetchContacts();
    contactsStore.fetchGroups();
  }, []);

  useEffect(() => {
    if (groupId) {
      const findGroup = contactsStore.groups.find((group) => group.id === groupId);
      setGroupContacts(findGroup);
      setContacts(() => {
        if (findGroup) {
          return contactsStore.contacts.filter((contact) => findGroup.contactIds.includes(contact.id));
        }
        return [];
      });
    }
  }, [groupId, contactsStore.contacts, contactsStore.groups]);

  if (contactsStore.loading) return <p>Загрузка...</p>;
  if (contactsStore.error) return <p>Ошибка: {contactsStore.error}</p>;

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {filteredContacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});

export default memo(GroupPage);