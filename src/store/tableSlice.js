import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const tableSlice = createSlice({
  name: 'tableInfo',
  initialState,
  reducers: {
    setTableInfo: (state, action) => {
      state.data = [...action.payload];
    },
  },
});

export const { setTableInfo } = tableSlice.actions;

export default tableSlice.reducer;
