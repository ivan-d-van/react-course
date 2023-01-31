import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTxHistory } from "../../api/transactions";



export const TransactionsHistory = () => {
    const [txHistory, setTxHistory] = useState([])
    const navigate = useNavigate();

    const { idToken } = useSelector(state => state.auth);
    
    getTxHistory(idToken).then(txHistory => {
        setTxHistory(txHistory);
    }).catch(error => {
        navigate('/login');
    })

    const handleDublicateTransaction = (row) => {
        navigate(`/send-transaction?username=${row.username}&amount=${row.amount}`, { state: { username: row.username, amount: row.amount } });
    }

    const showTxHistory = () => {
        return (     <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right"> Date </TableCell>
                  <TableCell align="right"> Username </TableCell>
                  <TableCell align="right"> Amount </TableCell>
                  <TableCell align="right"> Balance </TableCell>
                  <TableCell align="right"> Send again </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txHistory.map((row) => (
                  <TableRow
                    key={row.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.balance}</TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color={"primary"}
                            onClick={() => {
                                handleDublicateTransaction(row);
                            }}
                        >
                        {"Repeat"}
                        </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>);
    }
    return showTxHistory()
}