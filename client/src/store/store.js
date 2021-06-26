import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import emailReducer from './reducers/emailReducer';
import passwordReducer from './reducers/passwordReducer';
import recordReducer from './reducers/recordReducer';
import playlistReducer from './reducers/playlistReducer';

export default configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    user: userReducer,
    email: emailReducer,
    password: passwordReducer,
    record: recordReducer,
    playlist: playlistReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['ALERT_SET'],
      ignoredPaths: ['alert.button.onClick'],
    },
  }),
});
