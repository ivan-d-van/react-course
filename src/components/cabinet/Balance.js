import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";

export const Balance = () => {
    const [username, setUsername] = useState('')
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate();
    const { idToken } = useSelector(state => state.auth);

    getUserInfo(idToken).then(userInfo => {
        setUsername(userInfo.name)
        setBalance(userInfo.balance)
    }).catch(error => {
        navigate('/login');
    })
    const showBalance = () => {
            return (
                <div>
                    <div key='name'>Hello, {username}</div>
                    <div key='balance'>Your balance amount: {balance} PW</div>
                </div>
            );
    }
    return showBalance()
}