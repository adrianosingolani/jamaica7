import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer'

export default configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});
