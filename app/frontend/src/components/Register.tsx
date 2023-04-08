import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/login';
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
        const newUser = { name, email, password };
        await createUser(newUser);
        dispatch(register(newUser));
        console.log('Usuario criado e disparado!')
        navigate('/chat');
    } catch (err) {
        setError('User already registered'); // capturar errors não customizados
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