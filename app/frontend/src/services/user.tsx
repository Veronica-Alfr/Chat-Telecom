import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';
import { IUserData } from '../interfaces/IUserData';

const instance = axios.create({
  baseURL: 'http://localhost:3001'
});

export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = token;
};

export const loginUser = async (endpoint: string) => {
  const { data } = await instance.get(endpoint);
  return data;
};

export const registerUser = async ({ name, email, password }: IRegister): Promise<IUserData> => {
    const { data } = await instance.post('/register', { name, email, password });
    return data;
}

// export default instance;

