import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import emailReducer from './reducers/emailReducer';

export default configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
    email: emailReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['ALERT_SET'],
      ignoredPaths: ['alert.button.onClick'],
    },
  }),
});
