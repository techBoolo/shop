import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice.js';
import notificationReducer from './reducers/notificationSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer
  }
})

export default store;
