import { createSlice } from '@reduxjs/toolkit';
import { GroupsState } from '../../types/types';

const initialState: GroupsState = {};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
});

export default groupsSlice.reducer;