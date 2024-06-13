 import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { forgotPasswordValidation } from '../Validation/Validation';
import { forgotPasswordService } from '../Service/Service';
 
const { width, height } = Dimensions.get('window');

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState(''); 
  const [errors, setErrors] = useState({});

  const handleSubmitForgotPassowrd = async () => {
    try {
      const validation= await forgotPasswordValidation(email)
      setErrors(validation);
      if(Object.keys(validation).length === 0){
        const res= await forgotPasswordService(email);
        console.log(res.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to Forgot Password. Please try again.');
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
        <Text style={styles.signInText}>Forgot Password</Text>
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
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmitForgotPassowrd}>
            <Text style={styles.signInButtonText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.signInTextContainer}>
            <Text style={styles.orSignInBack}>Back to the ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.orSignInBackText}>Sign In</Text>
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
    marginTop: height * 0.01,
    marginBottom: height * 0.06,
  },
  sampleImage: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  signInText: {  
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.018,
    marginBottom: height * 0.008,
    alignSelf: 'flex-start', 
  },
 
  formContainer: {
    width: width * 0.9,
    alignItems: 'center',
    marginBottom: height *0.045,
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
  forgotPasswordContainer: { // New container for "Forget password?" text
    alignSelf: 'flex-end',
  },
  forgotPassword: {
    color: '#fff',
    marginBottom: height * 0.01,
    marginRight: width * 0.01,
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
    marginTop: -8,
  },
  signInTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.18,
  },
  orSignInBack: {
    color: '#fff',
    marginBottom: height * 0.01,
    fontFamily: "Gill Sans",
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:17,
    marginVertical: height * 0.015,
  },
  socialButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.010,
  },
  orSignInBackText:{
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight:"bold",
    marginBottom: height * 0.01,
    fontFamily: "Gill Sans",
  }
 
});

export default ForgotPassword