import React  from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, Dimensions, Image,ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
// import { PhotoGallery } from 'react-native-photos-gallery';

const { width, height } = Dimensions.get('window');

export const data = [
  {
    id: 1,
    source: { uri: 'http://13.201.186.22/static/best_image_1.jpg' },
  },
  {
    id: 2,
    source: { uri: 'http://13.201.186.22/static/best_image_3.jpg' },
  },
  {
    id: 3,
    source: { uri: 'http://13.201.186.22/static/best_image_2.jpg' },
  },
  {
    id: 4,
    source: { uri: 'http://13.201.186.22/static/best_image_4.jpg' },
  },
  {
    id: 5,
    source: { uri: 'http://13.201.186.22/static/best_image_1.jpg' },
  },
  {
    id: 6,
    source: { uri: 'http://13.201.186.22/static/best_image_3.jpg' },
  },
  {
    id: 7,
    source: { uri: 'http://13.201.186.22/static/best_image_2.jpg' },
  },
  {
    id: 8,
    source: { uri: 'http://13.201.186.22/static/best_image_4.jpg' },
  },
];

const SaveVideo = () => {
  
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  }; 
  

 

 

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
        {/* <PhotoGallery
          data={data}
          onImageExpand={({ visible }) => console.log(visible)}
          animatedImageDelay={90}
          modalBackgroundStyle={styles.modalBackgroundStyle}
        /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

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
    gap: 15,
  },
  menuButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#000133',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Gill Sans',
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    padding: width * 0.05,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:"flex-start"
  },
  imageItemContainer: {
    margin:2,
    width: '32%',
    aspectRatio: 1,
    marginVertical: 5,
  },
  imageItem: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.01,
  },
  modalBackgroundStyle: {
    backgroundColor: 'white',
  },
   
});

export default SaveVideo;
