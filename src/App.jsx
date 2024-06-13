import React, { useContext, useEffect, useState }  from 'react'
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './components/Auth/WelcomePage/WelcomePage';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import DrawerNavigator from './components/Page/DrawerNavigator/DrawerNavigator';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './components/AuthContext/AuthContext';
 
const Stack = createStackNavigator();
 
const App = () => {
  const { user } = useContext(AuthProvider);
 
  return (
    <>
 <NavigationContainer>
            <Stack.Navigator  initialRouteName={user ? 'VideoImage' : 'welcomePage'}>
                {!user ? (
                    <>
                        <Stack.Screen name="welcomePage" component={WelcomePage} options={{ headerShown: false }} />
                        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                        <Stack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false }} />
                    </>
                ) : (
                    <Stack.Screen name="VideoImage" options={{ headerShown: false }}>
                        {(props) => <ProtectedRoute {...props} component={DrawerNavigator} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    </>
  )
}

export default App

 