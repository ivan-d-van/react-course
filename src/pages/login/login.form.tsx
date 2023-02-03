import { Alert, Button, InputBaseComponentProps, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { login } from '../../actions/auth';
import { loginSuccess } from '../../reducers/auth';
import { AppDispatch } from '../../store';
import './.css'

interface IFormInput {
    email: string;
    password: string;
} 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<String>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    try {
        const idToken = await dispatch(login({ email, password })).unwrap();
        await dispatch(loginSuccess(idToken));
        navigate('/cabinet');
    } catch (error) {
        console.log('aaaa', error)
        setApiError((error as any).message);
    }
  };


  return (
    <form className='register-form_form' onSubmit={handleSubmit(onSubmit)}>
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
                onClick={async () => {
                    const idToken = await dispatch(login({ email, password })).unwrap();
                    await dispatch(loginSuccess(idToken));
                    navigate('/cabinet');
                  }
                }
                variant="contained"
                color="primary"
                size="large"
                disableElevation= {true}
                sx={{ width: '25vw' }}
            > 
                Login 
            </Button>
            <Snackbar
                message={apiError}
                autoHideDuration={4000}
                open={apiError.length > 0}
                onClose = {() => { setApiError('') }}
            >
                <Alert severity="error">{apiError}</Alert>
            </Snackbar>
            <Typography variant='subtitle1' component='div' gutterBottom = {true}>
                        <a href='/registration'>You are new? Register your account first!</a>
            </Typography>
        </div>
    </form>
  );
};

export default Login;