import { API_URL } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {   useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, ImageBackground, Modal, Alert, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
// import RNFetchBlob from 'rn-fetch-blob';
// import {  request, PERMISSIONS } from 'react-native-permissions';
// import PushNotification from 'react-native-push-notification';
import RNFS from 'react-native-fs';
 

 
const { width, height } = Dimensions.get('window');

const VideoImageDisplay = React.memo(() => {
  const route = useRoute();
  const { videoUri, imagePaths } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImagePaths, setCurrentImagePaths] = useState([]);
  const [imageUpdateToken, setImageUpdateToken] = useState(Date.now()); 
  const [loading, setLoading] = useState(false);

 
 
  
  useEffect(() => {
    setCurrentImagePaths(imagePaths);
    setImageUpdateToken(Date.now());    
  }, [imagePaths]);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const openModal = useCallback((image) => {
    setSelectedImage(image);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedImage(null);
  }, []);

  // const downloadImage = useCallback(async(REMOTE_IMAGE_PATH) => {
  //   const getExtention = (url) => {
  //     return url.split('.').slice(-1)[0];
  //   };
  //   const date = new Date();
  //   const image_URL = REMOTE_IMAGE_PATH;
  //   const ext = '.' + getExtention(image_URL);

  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.PictureDir;

  //   const options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path: `${PictureDir}/image_${date.getTime()}${ext}`,
  //       description: 'Image',
  //     },
  //   };
  //   config(options).fetch('GET', image_URL)
  //     .then((res) => {
  //       console.log('Response -> ', JSON.stringify(res));
  //       Alert.alert('Success', 'Image downloaded successfully.');
  //       closeModal();
  //     })
  //     .catch((error) => {
  //       console.error('Error downloading image:', error);
  //       Alert.alert('Error', 'Failed to download image.');
  //     });
  // }, []);



 
  const downloadImage = useCallback(async (REMOTE_IMAGE_PATH) => {
    try {
      const getExtension = (url) => url.split('.').pop();
      const date = new Date();
      const image_URL = REMOTE_IMAGE_PATH;
      const ext = '.' + getExtension(image_URL);
      const PictureDir = `${RNFS.PicturesDirectoryPath}/image_${date.getTime()}${ext}`;
      console.log("PictureDir:", PictureDir);
      const download = RNFS.downloadFile({
        fromUrl: image_URL,
        toFile: PictureDir,
        begin: (res) => {
          console.log('Download has begun:', res);
        },
        notification: true, 
      });
      const result = await download.promise;
      if (result.statusCode === 200) {
        await RNFS.scanFile(PictureDir);
        Alert.alert('Success', 'Image downloaded successfully. You can view it in your gallery.'); 
        closeModal();
      } else {
        console.error('Error downloading image:', result.statusCode);
        Alert.alert('Error', 'Failed to download image.');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  }, []);
  
 

  const memoizedImagePaths = useMemo(() => currentImagePaths, [currentImagePaths]);
  
  const handleImageLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const handleImageLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);
  return (
    <ImageBackground source={require('../../../../assets/images/back3.jpg')} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Image source={require('../../../../assets/images/menu1.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Best Image Picker</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.videoContainer}>
            <Video
              controls={true}
              source={{ uri: videoUri }}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.imageGrid}>
            {memoizedImagePaths?.map((item, index) => (
              <TouchableOpacity key={index} style={styles.imageItemContainer} onPress={() => openModal(item)}>
               {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
               <Image source={{ uri: `${API_URL}/${item}?token=${imageUpdateToken}` }} style={styles.imageItem}  onLoadStart={handleImageLoadStart}
                    onLoadEnd={handleImageLoadEnd} />
              </TouchableOpacity>
            ))}
          </View>       
          <Text style={styles.footerText}>Your Best Memories Are Here!</Text>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            {selectedImage && <Image source={{ uri: `${API_URL}/${selectedImage}?token=${imageUpdateToken}` }} style={styles.modalImage} />}
            <TouchableOpacity style={styles.downloadButton} onPress={() => downloadImage(`${API_URL}/${selectedImage}`)}>
              <Image source={require('../../../../assets/images/downloadIcon.png')} style={styles.downloadIcon} />
              <Text style={styles.downloadButtonText}>Download Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
});
 
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    paddingHorizontal: width * 0.05,  
    gap:15,
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
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    padding: width * 0.05,
  },
 
  videoContainer: {
    width: '96%',
    aspectRatio: 16 / 10,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom:25, 
  },

  videoThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width * 0.05 }, { translateY: -height * 0.03 }],
  },
  playIcon: {
    width: width * 0.1,
    height: width * 0.1,
    tintColor: '#fff',
  },
  imageGrid: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom:20,
    marginTop:10
  },
  imageItemContainer: {
    width: '33%',
    padding: 5,
    aspectRatio: 1,
    borderRadius: width * 0.02,
  },
  imageItem: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.02,
  },
  footerText: {
    marginTop: height * 0.01,
    fontSize: width * 0.05,
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 40,
    marginBottom:30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 30,
    gap: 100,
  },
  modalImage: {
    width: '100%',
    height: height * 0.4,
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#000133',
    borderRadius: 20,
  },
  downloadIcon: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: 10,
    objectFit: 'cover',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: width * 0.055,
    fontFamily: 'Gill Sans',
  },
 
});

export default VideoImageDisplay;

 



 {/* <View style={styles.playIconContainer}>
   {isVideoPlaying ? (
        <Image source={require('../../../assets/images/pausebutton.png')} style={styles.playIcon} />
        ) : (
       <Image source={require('../../../assets/images/playbutton.png')} style={styles.playIcon} />
           )}
</View> */}