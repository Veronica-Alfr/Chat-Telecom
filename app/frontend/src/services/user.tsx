import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';
import { IUserData } from '../interfaces/IUserData';
import { ILogin } from '../interfaces/ILogin';
import { IChat } from '../interfaces/IChat';

const url = 'http://localhost:3001';

const instance = axios.create({
  baseURL: url,
});

export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  const { data } = await instance.get(endpoint);
  return data;
};

export const loginUser = async (endpoint: string, { email, password }: ILogin): Promise<IUserData> => {
  const { data } = await instance.post(endpoint, { email, password });
  return data;
};

export const registerUser = async ({ name, email, password }: IRegister): Promise<IUserData> => {
    const { data } = await instance.post('/register', { name, email, password });
    return data;
}

export const chatData = async ({ name, roomId, message, time }: IChat) => {
  const { data } = await instance.post('/chat', { name, roomId, message, time });
  return data;
}

export default instance;
