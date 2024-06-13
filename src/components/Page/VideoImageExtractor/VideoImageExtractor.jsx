 
import React, {   useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions ,Image ,ImageBackground,Alert,ActivityIndicator  } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {  request, PERMISSIONS } from 'react-native-permissions';
 
import uploadVideo from '../../../api';
const { width, height } = Dimensions.get('window');

const VideoImageExtractor =  ( ) => {
  const [imagePaths, setImagePaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };
 
 const processVideo = async () => {
      try {
        const options = { mediaType: 'video', quality: 1 };
        const response = await launchImageLibrary(options);
        console.log("responseprocessVideo",response);
        if (response.didCancel) {
          console.log('User cancelled video picker');
          return;
        } else if (response.errorCode) {
          console.error('Video picker error:', response.errorCode);
          return;
        }
        setIsLoading(true);
        console.log('INFO: Executing uploadVideo function...');
        const path = await uploadVideo(response.assets[0].uri);
        console.log("pathprocessVideo",path);
        if(path){
          setImagePaths(path);
          setIsLoading(false);
          navigation.navigate('VideoImageDisplay', { videoUri: response.assets[0].uri, imagePaths:path });
        } 
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    const processCamera = async () => {
      try {
        const permission = await request(PERMISSIONS.ANDROID.CAMERA);
        if (permission !== 'granted') {
          console.log('Camera permission denied');
          return;
        }
        const options = {  mediaType: 'video',  videoQuality: 'high'};
        const response = await launchCamera(options);
        console.log("responseprocessCamera",response);
        if (response.didCancel) {
          console.log('User cancelled camera');
          return;
        } else if (response.errorCode) {
          console.error('Camera error:', response.errorCode);
          return;
        }
        setIsLoading(true);
        console.log('INFO: Executing uploadVideo function...');
        const path= await uploadVideo(response.assets[0].uri);
        console.log("pathprocessCamera",path);
        if(path){
          setImagePaths(path);
          setIsLoading(false);
          navigation.navigate('VideoImageDisplay', { videoUri: response.assets[0].uri, imagePaths:path });
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        Alert(error)
      }
    };

  return (
    <ImageBackground source={require('../../../../assets/images/back3.jpg')} style={[styles.backgroundImage]} imageStyle={styles.imageStyle}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}    >
          <Image  source= {require('../../../../assets/images/menu1.png')}   style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Best Image Picker</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.iconContainer}>
        <Image  source= {require('../../../../assets/images/play.png')}   style={styles.image} />
        </View>
        <TouchableOpacity style={styles.cameraButton} onPress={processCamera}>
          <Image  source= {require('../../../../assets/images/camera.png')}  style={{ width: 24, height: 23, tintColor: '#fff' }}/>
          <Text style={styles.cameraButtonText}>Use Camera</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={processVideo}>
        <Image  source= {require('../../../../assets/images/upload.png')}  style={{ width: 22, height: 21,fontWeight:"700", tintColor: '#000' }}/>
          <Text style={styles.uploadButtonText}>Upload here and find result</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    {isLoading && (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContainerBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Please Wait..</Text>
          </View>
        </View>
      )}
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    resizeMode: 'cover',  
    alignSelf: 'center',  
  },

 
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },

  header: {
    height: height * 0.2,
    justifyContent: 'flex-start', 
    alignItems: 'center',  
    paddingTop: height * 0.01,
    flexDirection: 'row',
    gap: 10,  
    paddingHorizontal: width * 0.05,  
    marginBottom:5
  },
  menuButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#000133",
    justifyContent: 'center',  
    alignItems: 'center' ,
  },
  menuIcon: {
    height: 30,  
    width: 30,   
    tintColor: '#fff',  
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.07,
    lineHeight: 37.8,
    fontWeight: 'bold',
    fontFamily: "Gill Sans",
  },
  body: {  
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    padding: width * 0.05,
  },
  iconContainer: {
    marginBottom: height * 0.05,
  },

  image: {
        width: 130,
        height: 130,
        marginBottom: height * 0.04,
        marginTop:height * 0.04
      },

  cameraButton: {
    backgroundColor: '#000133',
    height:50,
    width:240,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: height * 0.02,
    borderRadius: width * 0.1,
    marginBottom: height * 0.02,
  },

  cameraButtonText: {
    color: '#fff',
    marginLeft: width * 0.025,
    fontSize: width * 0.04,
    lineHeight:16,
    fontFamily: "Gill Sans",
    
  },
  orText: {
    fontSize: 15,
    color: '#000',
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
    fontFamily: "Gill Sans", 
    lineHeight:15
  },
  uploadButton: {
    // width:211,
    width: width * 0.7,
    height:19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  uploadButtonText: {
    color: '#000', 
    marginLeft: width * 0.015,  
    fontSize: width * 0.04,  
    lineHeight: 17, 
    fontWeight: "700",  
    fontFamily: "Gill Sans", 
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  loadingContainerBox: {
    height: 80,  
    width: 200,  
    borderRadius: 15,
    backgroundColor: "#010131",
    justifyContent: "center",
    alignItems: "center",
    textAlign:"center",
    flexDirection:"row",
    padding: 20,
    gap:10
  },
  loadingText: { 
    fontWeight: "bold",
    fontFamily: "Gill Sans",
    color: '#fff',
    fontSize: 15,
  },
  // Adding keyframes for the animation
  '@keyframes fadeInOut': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
 
});

export default VideoImageExtractor

 