import { configureStore } from '@reduxjs/toolkit';
import userReducers from './features/user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import reducerChat from './features/chat';

const store = configureStore({
  reducer: {
    user: userReducers,
    chat: reducerChat,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default store;
