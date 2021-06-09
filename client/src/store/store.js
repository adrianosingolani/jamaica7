import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
  },
});
