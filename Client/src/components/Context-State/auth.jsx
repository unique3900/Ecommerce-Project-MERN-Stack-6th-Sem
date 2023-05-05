import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    

    // Axios Default
    //By default axios ko header ma authorization i.e yedi auth xa vane tesko token lai include garne
    //Yo garepaxi pachi axios ma header ma authorization include garirakhnu pardaina
    axios.defaults.headers.common['authorization'] = auth?.token;

    useEffect(() => {
        const LocalData = localStorage.getItem("auth");
        if (LocalData) {
            const DataObj = JSON.parse(LocalData);
            setAuth({
                ...auth,
                user: DataObj.user,
                token:DataObj.token
            })
        }

    
  
    }, []);



    
    
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
          {children}
        </AuthContext.Provider>
      );
 
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
