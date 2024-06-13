import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions ,ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/welcomeBackground3.png')} style={[styles.backgroundImage ]} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}> 
      <View style={styles.imageContainer}>
        <Image source={require('../../../../assets/images/startImage.png')} style={styles.sampleImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Transform Videos{'\n'}Into Stunning Image{'\n'}Collections</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('register')}>
          <Text style={styles.startButtonText}>LET'S START →</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
  },
  sampleImage: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 60,
    gap:30
  },
  titleText: {
    fontSize: width * 0.07,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 40,
    fontWeight: '900',
    width: width * 0.9,
    height: height * 0.2,
  },
  startButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontWeight: 'bold',
    fontFamily:"Gill Sans"
  },
});

export default WelcomePage;
 