import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useGetGroupsQuery } from '../services/api';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const GroupListPage = memo(() => {
  const { data: groups, isLoading, error } = useGetGroupsQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных</p>;

  return (
    <Row xxl={4}>
      {groups?.map((groupContacts: GroupContactsDto) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});