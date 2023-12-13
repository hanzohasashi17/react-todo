import { createSlice } from '@reduxjs/toolkit';
import { TodoStatus } from './todoSlice';

type FilterType = string | TodoStatus

type FilterState = {
  filter: FilterType;
}

const initialState: FilterState = {
  filter: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;