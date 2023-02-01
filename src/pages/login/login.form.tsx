import { Button, InputBaseComponentProps, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import { loginSuccess } from '../../reducers/auth';
import { AppDispatch } from '../../store';
import './login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const idToken = await dispatch(login({ email, password })).unwrap();
    await dispatch(loginSuccess(idToken));
    navigate('/cabinet');

  };

  return (
    <form className='register-form_form' onSubmit={handleSubmit}>
        <div className="login-form">
            <Typography variant='h4' component='div' gutterBottom = {true}>
                Login
            </Typography>
            <TextField
                label='Enter your email' 
                inputProps={email as unknown as InputBaseComponentProps}
                size='small'
                margin='normal'
                fullWidth={true}
                sx={{ width: '25vw' }}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label='Enter your password' 
                inputProps={password as unknown as InputBaseComponentProps}
                type="password"
                size='small'
                margin='normal'
                fullWidth={true}
                sx={{ width: '25vw' }}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
                className='login-form_button'
                disableElevation= {true}
                sx={{ width: '25vw' }}
            > Register 
            </Button>
            <Typography variant='subtitle1' component='div' gutterBottom = {true}>
                        <a href='/registration'>You are new? Register your account first!</a>
            </Typography>
        </div>

    </form>
  );
};

export default Login;