import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import { registerSuccess } from '../../reducers/auth';

const Registration = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords don't match");
    } else {
        try {
            const idToken = await dispatch(register({ username, email, password })).unwrap();
            await dispatch(registerSuccess(idToken));
            navigate('/cabinet');
        } catch (error) {
            console.log(error);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <Input
            placeholder='Enter your name' 
            inputProps={username}
            aria-describedby="component-helper-text"
            onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        <Input
            placeholder='Enter your email' 
            inputProps={email}
            aria-describedby="component-helper-text"
            onChange={e => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        <Input
            placeholder='Enter your password' 
            inputProps={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        <Input
            placeholder='Confirm your password' 
            inputProps={passwordConfirm}
            type="password"
            onChange={e => setPasswordConfirm(e.target.value)}
        />
      </label>
      <br />
      <Button type="submit" onClick={handleSubmit}> Register </Button>
    </form>
  );
};

export default Registration;