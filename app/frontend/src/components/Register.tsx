import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, setToken } from '../services/login';
import { register } from '../store/features/user';
import registerValidate from '../validations/register';
import { useAppDispatch } from '../store/store';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmitRegister = async () => {
    try {
        dispatch(register({ name, email, password }));
        const { token } = await createUser({ name, email, password });

        setToken(token);
        localStorage.setItem('token',  token);

        navigate('/chat');
    } catch (error: any) {
        if (error.response?.status === 409) return setError('User already registered!');
        setError(`Error: ${error.message}`);
      }
    }

    const isButtonDisabled = () => (
        !registerValidate.validateEmail(email)
        || !registerValidate.validatePassword(password)
        || !registerValidate.validateName(name)
    );

  return(
    <div>
        <input
            placeholder="Your name"
            onChange={ handleChangeName }
            type="text"
            value={ name }
        />
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
        <div>
            <button
            type="button"
            onClick={ handleSubmitRegister }
            disabled={ isButtonDisabled() }
            >
                REGISTER
            </button>
            {error && (
            <span>
                {error}
            </span>
            )}
        </div>
    </div>
  )
}