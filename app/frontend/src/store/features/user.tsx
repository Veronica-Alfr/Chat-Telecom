import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { ILogin } from '../../interfaces/ILogin';
import { IRegister } from '../../interfaces/IRegister';

const initialStateLogin: ILogin = {
    email: '',
    password: '',
    roomId: 0,
}

const userLogin = createSlice({
  name: 'login',
  initialState: initialStateLogin,
  reducers: {
    login: (state, action: PayloadAction<{ email: string, password: string, roomId: number }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.roomId = action.payload.roomId;
    },
  },
});

const initialStateRegister: IRegister = {
    name: '',
    email: '',
    password: ''
}

const userRegister = createSlice({
  name: 'register',
  initialState: initialStateRegister,
  reducers: {
    register: (state, action: PayloadAction<{ name: string, email: string, password: string }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

const reducer = combineReducers({
  login: userLogin.reducer,
  register: userRegister.reducer,
});

export const { login } = userLogin.actions;
export const { register } = userRegister.actions;
export default reducer;
