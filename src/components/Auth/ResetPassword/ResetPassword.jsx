import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { resetPasswordValidation } from '../Validation/Validation';
import { resetPasswordService } from '../Service/Service';
import { useRoute } from '@react-navigation/native';
 
 
const { width, height } = Dimensions.get('window');

const ResetPassword = () => {
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const route = useRoute();
  const { id, token } = route.params;
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmitResetPassowrd = async () => {
    try {
      const userDetails={ password,confirmPassword }
      const validation= await resetPasswordValidation(password,confirmPassword)
      setErrors(validation);
      if(Object.keys(validation).length === 0){
        const res= await resetPasswordService(userDetails,id,token);
        console.log(res.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to Reset Passowrd. Please try again.');
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
        <Text style={styles.signInText}>Reset Password</Text>
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
          
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmitResetPassowrd}>
            <Text style={styles.signUpButtonText}>Reset Password</Text>
          </TouchableOpacity>
       
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
    marginBottom:120,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom:20
  },

  sampleImage: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop:20,
    marginBottom:50
  },

  signInText: {  
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:40,
    alignSelf: 'flex-start', 
  },
 
  formContainer: {
    width: width * 0.9,
    alignItems: 'center',
    marginTop:5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30,
    borderRadius: 10, 
    borderWidth: 2,   
    borderColor: '#fff',  
    width: '100%',
  },
  icon: {
    paddingHorizontal: 10,
  },
  errorBorder: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    paddingHorizontal: 10,

  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
 
 
  signUpButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.07,
    borderRadius: 30,
    marginVertical: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Gill Sans",
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 2,
  },
  orSignInText: {
    color: '#fff',
    marginTop:70,
    marginBottom: 10,
    fontFamily: "Gill Sans",
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:17
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:15
  },
});

 
export default ResetPassword