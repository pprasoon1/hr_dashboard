import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';

export default configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

