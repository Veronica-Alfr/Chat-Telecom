import axios from 'axios';
import { IRegister } from '../interfaces/IRegister';

const instance = axios.create({
  baseURL: 'http://localhost:3001'
});

// export async function LoginFetch(email: string, password: string) {
//   const response = await instance
//     .post('login', { email, password })
//     .catch((error) => {
//       return error.response; // Usar a lógica de erro do back-end
//     });

//   if (response.data.token) {
//     const { data } = response;
//     const { token } = data;
//     instance.defaults.headers.Authorization = token;
//     return response;
//   }
//   return response;
// }

interface IUserData {
  token: string;
}

export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = token;
};

export const loginUser = async (endpoint: string) => {
  const { data } = await instance.get(endpoint);
  return data;
};

export const createUser = async ({ name, email, password }: IRegister): Promise<IUserData> => {
    const { data } = await instance.post('/register', { name, email, password });
    return data;
}

// export default instance;

