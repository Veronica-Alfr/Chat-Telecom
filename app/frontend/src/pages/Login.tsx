import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser, requestData, setToken } from "../services/user";
import registerOrLoginValidate from "../validations/register";
import { useAppDispatch } from "../store/store";
import { login } from "../store/features/user";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roomId, setRoom] = useState(0);
    const [error, setError] = useState('');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleJoinRoom = (e: React.ChangeEvent<HTMLInputElement>) => setRoom(Number(e.target.value));

    const isButtonDisabled = () => (
        !registerOrLoginValidate.validateEmail(email)
        || !registerOrLoginValidate.validatePassword(password)
        || !registerOrLoginValidate.validateRoom(roomId)
    );

  const handleLogin = async () => {
    try {
        dispatch(login({ email, password, roomId }))
        const { token } = await loginUser('/login', { email, password, roomId });

        setToken(token);

        const { email: Email } = await requestData('/login/validate');

        localStorage.setItem('token',  token);
        localStorage.setItem('email',  Email);
        localStorage.setItem('roomId', String(roomId));

        navigate('/chat');
    } catch (error: any) {
        if (error.response?.status === 401) {
            if (error.response.statusText === 'Unauthorized' && error.response.data.message.includes('password')) {
              return setError('Your password is incorrect.');
            }

            return setError('You are not registered or your email is incorrect.');
        }
        return setError(`Error: ${error.message}`);
    }
  };

  return(
    <form>
        <input
            placeholder="Email"
            onChange={ handleChangeEmail }
            type="email"
            value={ email }
        />
        <input
            placeholder="Password"
            onChange={ handleChangePassword }
            type="password"
            value={ password }
        />
        <input
            type="text"
            placeholder="Room ID"
            onChange={ handleJoinRoom }
          />
        <div>
            <button
            type="button"
            onClick={ handleLogin }
            disabled={ isButtonDisabled() }
            >
                Login
            </button>
            {error && (
            <span>
                {error}
            </span>
            )}
            <button
                type="button"
                onClick={ () => navigate('/register')}
            >
                Cadastrar
            </button>
        </div>
    </form>
  )
}