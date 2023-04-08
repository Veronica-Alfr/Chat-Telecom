import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export async function LoginFetch(email: string, password: string) {
  const response = await instance
    .post('login', { email, password })
    .catch((error) => {
      return error.response; // Usar a lógica de erro do back-end
    });

  if (response.data.token) {
    const { data } = response;
    const { token } = data;
    instance.defaults.headers.Authorization = token;
    return response;
  }
  return response;
}

export function createUser({ name, email, password }: IRegister) {
    return new Promise((resolve, reject) => {
      instance.post('register', { name, email, password })
        .then((response) => {
          instance.defaults.headers.Authorization = response.data.token;
          resolve(response.data);
        })
        .catch((error) => reject(error.response));
    });
  }
