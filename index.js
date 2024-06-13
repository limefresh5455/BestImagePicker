/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import AuthContext from './src/components/AuthContext/AuthContext';
 
const AppWithAuthProvider = () => (
    <AuthContext>
      <App />
    </AuthContext>
  );

AppRegistry.registerComponent(appName, () => AppWithAuthProvider);
