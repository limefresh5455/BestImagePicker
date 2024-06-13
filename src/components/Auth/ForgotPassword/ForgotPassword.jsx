 import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { forgotPasswordValidation } from '../Validation/Validation';
import { forgotPasswordService } from '../Service/Service';
 
const { width, height } = Dimensions.get('window');

const ForgotPassword = () => {
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
            <Text style={styles.signInButtonText}>Send</Text>
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
    marginBottom:50,
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
    marginTop:18,
    marginBottom:8,
    alignSelf: 'flex-start', 
  },
 
  formContainer: {
    width: width * 0.9,
    alignItems: 'center',
     
    marginTop:10,
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
 
 
  signInButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.07,
    // height: 50,
    borderRadius: 30,
    marginVertical: 30,
    marginBottom:60,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily:"Gill Sans"
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

export default ForgotPassword