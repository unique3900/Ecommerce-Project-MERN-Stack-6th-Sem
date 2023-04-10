import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    
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
