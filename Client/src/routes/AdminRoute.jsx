import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/Context-State/auth';
import { Outlet, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Spinner from '../components/SubComponents/Spinner';
const AdminRoute = () => {

    const [valid, setValid] = useState(false);
    const [auth, setAuth] = useAuth();


    const data = JSON.parse(localStorage.getItem("auth"));
    const myUser = data.user.email;
    const [email, setEmail] = useState(myUser);
    const [password, setPass] = useState("123");

    
    // const email = user[0].email;
    useEffect(() => {
       
        const authCheck = async () => {
            // const email = myUser;
            //COntext ma axios bydefault header included cha so no need to add header here
            const fetchData = await axios.post('http://localhost:8080/api/v1/auth/admin-auth',{email,password});
            if (fetchData.data.valid) {
                setValid(true);
            }
            else {
                setValid(false);
            }
        }
        
        if (auth?.token) {
            authCheck();
        }

    }, [auth?.token]);
    
    return valid ? <Outlet /> :<Spinner/>
}

export default AdminRoute
