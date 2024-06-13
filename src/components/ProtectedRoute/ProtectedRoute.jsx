import React, { useContext } from 'react';
import { AuthProvider } from '../AuthContext/AuthContext';
import Login from '../Auth/Login/Login';
 
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthProvider);
    if (!user) {
        return <Login />;
    }
    return <Component {...rest} />;
};

export default ProtectedRoute;
