import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/auth';
import { Balance } from './balance.form';
import { TransactionsHistory } from './tx-history.form';
import './.css'
import { Button } from '@mui/material';

const Cabinet: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div>
        <div className='cabinet-general-form'>
        <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation= {true}
                    sx={{ width: '25vw' }}
                    onClick={() => {
                        dispatch(logout())
                    }}
                > 
                    Logout 
            </Button>
            <br />
            <br />
            <Balance />
            <br />
            <a href='/send-transaction'>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation= {true}
                    sx={{ width: '25vw' }}
                > 
                    Send transaction 
                </Button>
            </a>
            <br />
        </div>
        <TransactionsHistory />
        </div>
    );
};

export default Cabinet;
