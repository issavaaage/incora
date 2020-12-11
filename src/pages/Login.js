import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login({currentUser, setCurrentUser}) {

    const [email, setEmail] = React.useState('');
    const [users, setUsers] = React.useState(undefined);

    React.useEffect(async () => {
        try {
            let users = await axios('https://jsonplaceholder.typicode.com/users');
            setUsers(users.data);
        } catch(e) {
            console.log(e);
        }
    }, []);

    const handleLogChange = (e) => {
        setEmail(e.target.value);
    }

    const handleLogClick = () => {
        let success = false;
  
        users.forEach(async (el) => {

            try {
                if(el.email === email) {
                    success = true;
                    setCurrentUser({...el, status: 'success'});
                }
            } catch(e) {
                console.log(e);
            }
        });
  
        if(!success) {
            setCurrentUser({
                status: 'fail',
                message: 'Cant get current user!'
            });
        }
    }

    return (
        
        currentUser.status === 'success' ? 

        <Redirect to="/articles"/>

        :

        <div className="container">
            <div className="login-form">
                <div className="login-form__content">
                    <p>Please paste your email</p>
                    <input type="text" value={email} onChange={handleLogChange}></input>
                    <button className="btn-log" onClick={handleLogClick}>Login</button>
                    {
                        currentUser.status === 'fail' ? <p>{currentUser.message}</p> : null
                    }
                </div>
            </div>
        </div>
        
    )
}

export default Login
