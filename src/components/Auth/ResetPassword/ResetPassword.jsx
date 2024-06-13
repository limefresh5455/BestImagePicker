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

  const handleSubmitResetPassword = async () => {
    try {
      const userDetails = { password, confirmPassword };
      const validation = await resetPasswordValidation(password, confirmPassword);
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        const res = await resetPasswordService(userDetails, id, token);
        console.log(res.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/welcomeBackground3.png')} style={styles.backgroundImage} />
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
                  setErrors((prevErrors) => ({ ...prevErrors, password: null }));
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
                  setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }));
                }
              }}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmitResetPassword}>
            <Text style={styles.signInButtonText}>Reset Password</Text>
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
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  sampleImage: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  signInText: {  
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.018,
    marginBottom: height * 0.008,
    alignSelf: 'flex-start', 
  },
  formContainer: {
    width: width * 0.9,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height *0.23,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    width: '100%',
  },
  icon: {
    paddingHorizontal: width * 0.02,
  },
  errorBorder: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: height * 0.05,
    color: '#fff',
    paddingHorizontal: width * 0.02,
  },
  eyeIcon: {
    paddingHorizontal: width * 0.02,
  },
  signInButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.07,
    borderRadius: 30,
    marginVertical: height * 0.02,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    fontFamily: "Gill Sans",
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: width * 0.02,
    marginTop: height * 0.005,
  },
});

export default ResetPassword;
