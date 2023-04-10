import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../interfaces/IChat';

const initialStateChat: IChat = {
    name: '',
    roomId: 0,
    message: '',
    time: '',
}

const chatData = createSlice({
  name: 'chat',
  initialState: initialStateChat,
  reducers: {
    chat: (state, action) => {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.message = action.payload.message;
      state.time = action.payload.time;
    },
  },
});

const reducerChat = chatData.reducer;

export const { chat } = chatData.actions;
export default reducerChat;
