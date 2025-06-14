/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userContext = createContext();

const authContext = ({ children }) => {  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Fetching:", "http://localhost:3000/api/auth/verify", "Token:", token);
    
                if (!token) {
                    setUser(null);
                    return;
                }
    
                const response = await axios.get("http://localhost:3000/api/auth/verify", {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                console.log("API Response:", response.data);
                if (response.data.success) {
                    setUser(response.data.user);
                }
                else{
                    setUser(null);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Auth Verify Error:", error.response?.data || error.message);
                setUser(null);
                
            }finally{
                setLoading(false);
            }
        };
        verifyUser();
    }, []);
    

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <userContext.Provider value={{ user, login, logout ,loading}}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);

const AuthContextWrapper = (props) => authContext(props);
export default AuthContextWrapper;
