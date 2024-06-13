import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signUpValidation } from '../Validation/Validation';
import { signUpService } from '../Service/Service';

const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [number, setNumber] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmitsignUp = async () => {
    try {
      const userDeatils = {name,email,number,password,confirmPassword}
      const validation= await signUpValidation(userDeatils)
      setErrors(validation);
      if(Object.keys(validation).length === 0){
        const res= await signUpService(userDeatils);
        console.log(res.data);
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
        <View style={styles.headerContainer}>
          <View style={styles.logoImageContainer }>
            <Image source={require('../../../../assets/images/bestimagelogo.png')} style={styles.logoImage} />
          </View>
          <Text style={styles.headerText}>Best Image Picker</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.signUpText}>Sign Up</Text>
          
          <View style={[styles.inputContainer, errors.name && styles.errorBorder]}>
            <Icon name="user" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#fff"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (text) {
                  setErrors(prevErrors => ({ ...prevErrors, name: null }));
                }
              }}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>} 
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
          <View style={[styles.inputContainer, errors.number && styles.errorBorder]}>
            <Icon name="phone" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Number"
              placeholderTextColor="#fff"
              keyboardType="phone-pad"
              value={number}
              onChangeText={(text) => {
                setNumber(text);
                if (text) {
                  setErrors(prevErrors => ({ ...prevErrors, number: null }));
                }
              }}
            />
          </View>
          {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
        
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
          
          <View style={[styles.inputContainer, errors.confirmPassword && styles.errorBorder]}>
            <Icon name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (text) {
                  setErrors(prevErrors => ({ ...prevErrors, confirmPassword: null }));
                }
              }}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmitsignUp}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
          
          <View style={styles.signInTextContainer}>
            <Text style={styles.orSignInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signInText}>Sign In</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top:5,
    // marginBottom: 30,
    // padding:10,
    // marginLeft:20,
    // marginRight:20
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
  logoImageContainer:{
    width: 50,
    height: 50,
    backgroundColor:"#000",
    borderRadius: 25,
    alignItems:"center",
    justifyContent:"center"
  },
  logoImage: {
    width: 40,
    height: 30,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: "Gill Sans",
    color: '#fff',
    // marginLeft: 10,
    // lineHeight:38,
    marginLeft: width * 0.02,
    lineHeight: width * 0.12,
  },
  signUpText: {
    fontSize: 30,
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
    // marginTop:40,
    marginTop: height * 0.05,
    alignItems: 'center',
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
  errorBorder: {
    borderColor: 'red',
  },
  icon: {
    // paddingHorizontal: 10,
    paddingHorizontal: width * 0.02,
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
  signUpButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.07,
    borderRadius: 30,
    // marginVertical: 20,
    marginVertical: height * 0.02,
  },
  signUpButtonText: {
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
  signInTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
    // marginTop:100,
    marginBottom: height * 0.02,
    marginTop: height * 0.1,
  },
  orSignInText: {
    // fontSize: 14,
    fontSize: width * 0.04,
    color: '#fff',
  },
  signInText: {
    // fontSize: 17,
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight:"bold"
  },
});

export default Register;
