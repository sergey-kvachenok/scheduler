import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './basketSlice'
import tableSlice from './tableSlice';

const store = configureStore({
  reducer: {
    basket: basketSlice,
    tableInfo: tableSlice
  }
})

export default store;
