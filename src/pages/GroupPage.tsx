import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useGetContactsQuery, useGetGroupsQuery } from '../services/api';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: contacts, isLoading: contactsLoading } = useGetContactsQuery();
  const { data: groups, isLoading: groupsLoading } = useGetGroupsQuery();
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto | undefined>();
  const [filteredContacts, setContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    if (groups && contacts && groupId) {
      const findGroup = groups.find((group) => group.id === groupId);
      setGroupContacts(findGroup);
      setContacts(() => {
        if (findGroup) {
          return contacts.filter((contact) => findGroup.contactIds.includes(contact.id));
        }
        return [];
      });
    }
  }, [groupId, contacts, groups]);

  if (contactsLoading || groupsLoading) return <p>Загрузка...</p>;

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