import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export  const AuthProvider = createContext();


const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log("AuthContext useEffect triggered");
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userDetail');
        console.log("User data from AsyncStorage:", userData);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUser();
  }, []);
  

  return (
    <AuthProvider.Provider value={{user,setUser}}>{ children }</AuthProvider.Provider>
  )
}

export default AuthContext