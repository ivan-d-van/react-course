import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { sendTransaction } from '../../api/transactions'
import { getUserInfo, getUserList } from "../../api/user";
import { RootState } from '../../store';
import { Alert, Button, InputBaseComponentProps, Snackbar } from '@mui/material';
import './.css'

const SendTransaction: React.FC = () => {
    const location = useLocation();

    const [txUsername, setTxUsername] = useState('');
    const [txAmount, setTxAmount] = useState(0);
    const [options, setOptions] = useState([{ name: '' }]);
    const [validationError, setValidationError] = useState('');
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
      }, [idToken, location]);


    const checkAmount = (value: string) => {
        if (!value || value === '') return;
        const number = parseInt(value);
        if (number > balanceAmount) {
            setValidationError('Not enough tokens on your balance');
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

      console.log('aaa', { txAmount })
  return (
    <div className='send-tx-form'>
        <a href='/cabinet'>
            <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation= {true}
                    sx={{ width: '15vw' }}
                > 
                Back to cabinet
            </Button>
        </a>
        <br />
        <table>
        <thead>
            <th>
                <TextField
                    label='Send amount' 
                    inputProps={txAmount as unknown as InputBaseComponentProps}
                    size='small'
                    margin='normal'
                    fullWidth={true}
                    sx={{ width: '20vw' }}
                    defaultValue={location?.state?.amount ? location.state.amount : 0}
                    onChange={e => checkAmount(e.target.value)}
                />  
            </th>
            <th>
            </th>
        </thead>
        <tbody>
            <tr> 
                <td>
                <Autocomplete
                    id="name"
                    options={options}
                    onInputChange={onInputChange}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '20vw' }}
                    defaultValue={location?.state?.username ? {name: location.state.username} : {name: ''}}
                    renderInput={(params) => (
                    <TextField {...params} label="Name of receiver" variant="outlined" />
                    )}
                />
                </td>
                <td align='left'>
                    <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation= {true}
                    sx={{ width: '15vw' }}
                    onClick={() => {
                        send()
                    }}
                    > 
                        Send transaction
                    </Button>
                </td>
            </tr>
        </tbody>
        </table>
        <Snackbar
            message={validationError}
            autoHideDuration={4000}
            open={validationError.length > 0}
            onClose = {() => { setValidationError('') }}
        >
            <Alert severity="error">{validationError}</Alert>
        </Snackbar>
     </div>
  );
};

export default SendTransaction;
