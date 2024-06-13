import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, ScrollView ,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInValidation } from '../Validation/Validation';
// import { signInService } from '../Service/Service';
import { AuthProvider } from '../../AuthContext/AuthContext';
 

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');  
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthProvider)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleSubmitsignIn = async () => {
    try {
      const userDeatils = { email,password}
      const validation= await signInValidation(userDeatils);
      setErrors(validation);
      if(Object.keys(validation).length === 0){
        // const res= await signInService(userDeatils);
        await AsyncStorage.setItem('userDetail',JSON.stringify({ role: "user", name: "text User" }));
        setUser({ role: "user", name: "text User" });
        navigation.replace('VideoImage');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again.');
      console.error('Error:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/welcomeBackground3.png')} style={[styles.backgroundImage ]} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={require('../../../../assets/images/startImage.png')} style={styles.sampleImage} />
        </View>
   
        <View style={styles.formContainer}>
        <Text style={styles.signInText}>Sign in</Text>
        <View style={[styles.inputContainer, errors.email && styles.errorBorder]}>
        <Icon name="envelope" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text) {
              setErrors((prevErrors) => ({ ...prevErrors, email: null }));
            }
          }}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <View style={[styles.inputContainer, errors.password && styles.errorBorder]}>
            <Icon name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) {
                  setErrors(prevErrors => ({ ...prevErrors, password: null }));
                }
              }}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={()=>navigation.navigate('forgotPassword')} >
            <Text style={styles.forgotPassword}>Forget password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmitsignIn}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.orSignInText}>Or sign in with</Text>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={()=> navigation.navigate('resetPassword', { id: "dhubfudfhdf", token:"pathyup" })} >
              <Image source={require('../../../../assets/images/google.png')} style={{ width: 40, height: 40,fontWeight:"700" }}    />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../../assets/images/facebook.png')} style={{ width: 30, height: 30,fontWeight:"700" }}    />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../../../assets/images/twitter.png')} style={{ width: 20, height: 20,fontWeight:"700", tintColor: '#fff' }}    />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../../assets/images/linkedin.png')} style={{ width: 40, height: 40,fontWeight:"700" }}    />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // marginTop: 35,
    // marginBottom:20
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  sampleImage: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  signInText: {  
    // fontSize: 30,
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    // marginTop:18,
    // marginBottom:8,
    marginTop: height * 0.018,
    marginBottom: height * 0.008,
    alignSelf: 'flex-start', 
  },
 
  formContainer: {
    width: width * 0.9,
    alignItems: 'center',
    // marginBottom:45
    marginBottom: height * 0.05,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 10,
    marginVertical: height * 0.01,
    borderRadius: 10, 
    borderWidth: 2,   
    borderColor: '#fff',  
    width: '100%',
  },
  icon: {
    // paddingHorizontal: 10,
    paddingHorizontal: width * 0.02,
  },
  errorBorder: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    // height: 40,
    height: height * 0.05,
    color: '#fff',
    // paddingHorizontal: 10,
    paddingHorizontal: width * 0.02,
  },
  eyeIcon: {
    // paddingHorizontal: 10,
    paddingHorizontal: width * 0.02,
  },
  forgotPasswordContainer: { // New container for "Forget password?" text
    alignSelf: 'flex-end',
  },
  forgotPassword: {
    color: '#fff',
    // marginBottom:10,
    // marginRight: 10,  
    marginBottom: height * 0.01,
    marginRight: width * 0.01,
  },
 
  signInButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.07,
    // height: 50,
    borderRadius: 30,
    // marginVertical: 20,
    marginVertical: height * 0.02,
  },
  signInButtonText: {
    color: '#fff',
    // fontSize: 16,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontFamily: "Gill Sans",
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    // marginLeft: 10,
    marginLeft: width * 0.02,
    marginTop: -8,
  },
  orSignInText: {
    color: '#fff',
    // marginTop:70,
    // marginBottom: 10,
    marginTop: height * 0.075,
    marginBottom: height * 0.02,
    fontFamily: "Gill Sans",
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:17,
    marginVertical: height * 0.015,
  },
  socialButton: {
    // width: 40,
    // height: 40,
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical:15
    marginVertical: height * 0.010,
  },
});

export default Login;
