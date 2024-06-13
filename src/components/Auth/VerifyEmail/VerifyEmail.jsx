import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getEmailVerifyService } from '../Service/Service';
const { width, height } = Dimensions.get('window');

const VerifyEmail = ({ navigation }) => {
    const route = useRoute();
    const { token } = route.params;
    const [verificationStatus, setVerificationStatus] = useState("success");
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
          initialized.current = true;
          getVerifyEmail();
        }
      }, []);
    
      const getVerifyEmail = async () => {
        try {
          const res = await getEmailVerifyService(token);
          if (res.data.status === 200) {
            setVerificationStatus("success");
          }
        } catch (err) {
          setVerificationStatus("expired");
        }
      };

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/welcomeBackground3.png')} style={styles.backgroundImage} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          {verificationStatus === "pending" && <ActivityIndicator size="large" color="#fff" />}
          {verificationStatus === "success" && (
            <>
              <Image source={require('../../../../assets/images/successIcon2.png')} style={styles.successIcon} />
              <Text style={styles.successText}>Awesome!</Text>
              <Text style={styles.successText1}>Your account has been verified {'\n'} successfully.</Text>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginButtonText}>Login Now</Text>
              </TouchableOpacity>
            </>
          )}
          {verificationStatus === "expired" && (
             <>
             <Image source={require('../../../../assets/images/cross.png')} style={styles.successIcon} />
             <Text style={styles.successText}>Opps!</Text>
             <Text style={styles.successText1}>Your link has expired.</Text>
             <TouchableOpacity style={styles.loginButton1} onPress={() => navigation.navigate('register')}>
               <Text style={styles.loginButtonText}>Back to Signup</Text>
             </TouchableOpacity>
           </>
          )}
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
      padding: 20,
    },
    contentContainer: {
      alignItems: 'center',
      width: '100%',
    },
    successIcon: {
      width: width * 0.5,
      height: width * 0.5,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    successText: {
      fontSize: 25,
      fontWeight: "bold",
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    successText1: {
      fontSize: 18,
      fontWeight: "bold",
      color: '#fff',
      marginBottom: 25,
      textAlign: 'center',
      marginTop:10,
    },
    loginButton: {
      backgroundColor: '#32CD32',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: 50,
      borderRadius: 25,
      marginTop:10,
      marginBottom: width * 0.05,
    },
    loginButton1:{
        backgroundColor: '#D82D1C',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        borderRadius: 25,
        marginTop:10,
        marginBottom: width * 0.05,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errorText: {
      fontSize: 25,
      fontWeight: "bold",
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    errorText1: {
      fontSize: 18,
      fontWeight: "bold",
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    errorText2: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
    },
  });

export default VerifyEmail;
