import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useSelector } from 'react-redux';
import { RootState } from 'src/types/types';

export const GroupPage = memo(() => {
  const contactsState = useSelector((state: RootState) => state.contacts.contacts);
  const groups = useSelector((state: RootState) => state.groups.groups);

  const { groupId } = useParams<{ groupId: string }>();
  const [contacts, setContacts] = useState<ContactDto[]>(contactsState);
  const [groupContacts, setGroupContacts] = useState<GroupContactsDto | undefined>();

  useEffect(() => {
    const findGroup = groups.find((group) => String(group.id) === String(groupId));
    setGroupContacts(findGroup);
    setContacts(() => {
      if (findGroup) {
        return contactsState.filter((contact) => findGroup.contactIds.includes(contact.id));
      }
      return [];
    });
  }, [groupId, contactsState, groups]); 

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
              {contacts.map((contact) => (
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