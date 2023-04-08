import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { ILogin } from '../../interfaces/ILogin';
import { IRegister } from '../../interfaces/IRegister';

const initialStateLogin: ILogin = {
    email: '',
    password: ''
}

const userLogin = createSlice({
  name: 'login',
  initialState: initialStateLogin,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

const initialStateRegister: IRegister = { // jogar tudo em um array?
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
