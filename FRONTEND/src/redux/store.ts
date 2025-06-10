import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts.ts';
import { authReducer } from './slices/auth.ts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
