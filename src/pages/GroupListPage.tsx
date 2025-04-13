import { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { contactsStore } from '../stores/ContactsStore';

const GroupListPage = observer(() => {
  useEffect(() => {
    contactsStore.fetchGroups();
  }, []);

  if (contactsStore.loading) return <p>Загрузка...</p>;
  if (contactsStore.error) return <p>Ошибка: {contactsStore.error}</p>;

  return (
    <Row xxl={4}>
      {contactsStore.groups.map((groupContacts: GroupContactsDto) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});

export default memo(GroupListPage);