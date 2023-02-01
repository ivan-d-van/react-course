import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { sendTransaction } from '../../api/transactions'
import { getUserInfo, getUserList } from "../../api/user";
import { RootState } from '../../store';


const SendTransaction: React.FC = () => {
    const location = useLocation();

    const [txUsername, setTxUsername] = useState('');
    const [txAmount, setTxAmount] = useState(0);
    const [options, setOptions] = useState([{ name: '' }]);
    const [ balanceAmount, setBalanceAmount ] = useState(0);
    
    const { idToken } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();



    useEffect(() => {
        getUserInfo(idToken).then(userInfo => {
            setBalanceAmount(userInfo.balance);
        })
        if (location?.state?.username && location?.state?.amount) {
            setTxUsername(location.state.username);
            setTxAmount(location.state.amount);
        }
        return () => { }
      }, [idToken, location]);


    const checkAmount = (value: string) => {
        if (!value || value === '') return;
        const number = parseInt(value);
        if (number > balanceAmount) {
            alert('Not enough money');
        } else {
            setTxAmount(number);
        }

    }

    const send = async () => {
        await sendTransaction(txUsername, txAmount, idToken);
        navigate('/cabinet')
    }

    const onInputChange = (event: any, value: string, reason: any) => {
        if (value) {
          getData(value);
          setTxUsername(value);
        } else {
          setOptions([]);
        }
      };
    
      const getData = (filter: string) => {
        getUserList(filter, idToken)
          .then((users) => {
            const updatedOptions = users.map((user) => ({ name: user.name}));
            setOptions(updatedOptions);
          });
      };

  return (
    <div>
        <a href='/cabinet'>
            <button type="button">{'Go back to cabinet'}</button>
        </a>
        <Autocomplete
            id="name"
            options={options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            defaultValue={location?.state?.username ? {name: location.state.username} : {name: ''}}
            renderInput={(params) => (
            <TextField {...params} label="Name of receiver" variant="outlined" />
            )}
        />
        <label>
            Send amount:
                <input
                    type="text"
                    value={txAmount}
                    onChange={e => checkAmount(e.target.value)}
                />
        </label>
        <button type="button" onClick={() => {
            send()
        }}> Send transaction </button>
     </div>
  );
};

export default SendTransaction;
