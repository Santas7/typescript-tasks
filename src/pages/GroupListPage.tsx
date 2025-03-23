import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { fetchGroups } from '../redux/actions/groupsActions';

import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { RootState } from 'src/types/types';
import { AppDispatch } from 'src/redux/store';

export const GroupListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { groups, loading, error } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups()); 
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Row xxl={4}>
      {groups.map((groupContacts: GroupContactsDto) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});