import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/auth';
import { Balance } from './Balance';
import { TransactionsHistory } from './TransactionsHistory';

const Cabinet = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Balance />
            <br />
            <a href='/send-transaction'>
                <button type="button">{'Send transation'}</button>
            </a>
            <button type="button" onClick={() => {
                dispatch(logout())
            }}>
            {'Logout'}
            </button>
            <br />
            /<TransactionsHistory />
        </div>
    );
};

export default Cabinet;
