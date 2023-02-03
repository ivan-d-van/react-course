import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTxHistory } from "../../api/transactions";
import { RootState } from "../../store";

export type TransactionData = {
    id: number
    date: string,
    username: string,
    amount: number,
    balance: number
}

export const TransactionsHistory: React.FC = () => {
    const [txHistory, setTxHistory] = useState<TransactionData[]>([])
    const navigate = useNavigate();

    const { idToken } = useSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        getTxHistory(idToken).then(txHistory => {
            setTxHistory(txHistory);
        }).catch(error => {
            navigate('/login');
        })
    }, [idToken])


    const handleDublicateTransaction = (row: TransactionData) => {
        navigate(`/send-transaction?username=${row.username}&amount=${row.amount * -1}`, { state: { username: row.username, amount: row.amount } });
    }


    return (     
        <TableContainer component={Paper}>
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
                    key={row.id}
                  >
                    <TableCell align="right"> {row.date} </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.balance}</TableCell>
                    <TableCell align="right">
                        {row.amount < 0 ? <Button
                            variant="contained"
                            color={"primary"}
                            onClick={() => {
                                handleDublicateTransaction(row);
                            }}
                        >
                        {"Repeat"}
                        </Button> : <></>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
}