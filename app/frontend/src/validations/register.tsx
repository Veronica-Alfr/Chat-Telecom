const MINIMUN_LENGTH_PASSWORD = 6;
const MINIMUN_LENGTH_NAME = 6;

const registerOrLoginValidate = {
  validateEmail: (email: string) => (/(.+)@(.+){2,}\.(.+){2,}/.test(email)),
  validatePassword: (password: string) => (password.length >= MINIMUN_LENGTH_PASSWORD),
  validateName: (name: string) => (name.length >= MINIMUN_LENGTH_NAME),
};

export default registerOrLoginValidate;
