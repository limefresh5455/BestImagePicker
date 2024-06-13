import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure this library is installed
import SaveVideo from '../SaveVideo/SaveVideo';
import VideoImageDisplay from '../VideoImageDisplay/VideoImageDisplay';
import VideoImageExtractor from '../VideoImageExtractor/VideoImageExtractor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../../AuthContext/AuthContext';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { setUser } = useContext(AuthProvider);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    props.navigation.replace('login'); 
  };
 

return(
  <ImageBackground source={require('../../../../assets/images/welcomeBackground3.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Image Picker</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeDrawer}>
          <Icon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.drawerHeader}>
        <View style={styles.profileImage}>
         <Image source={require('../../../../assets/images/user.png')}  style={styles.userImage}   />
        </View>
        <Text style={styles.username}>User</Text>
      </View>
      <TouchableOpacity   style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Account Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.drawerItem} onPress={() => props.navigation.navigate("saveVideo")}  >
        <Text style={styles.drawerItemText}>Save Video</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.drawerItem} onPress={handleLogout}  >
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
)
}

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{ drawerStyle: { width: '100%', } }} >
    {/* <Drawer.Screen name="VideoImageExtractor" component={VideoImageExtractor} options={{ headerShown: false }} />
    <Drawer.Screen name="VideoImageDisplay" component={VideoImageDisplay} options={{ headerShown: false }} />
    <Drawer.Screen name="saveVideo" component={SaveVideo} options={{ headerShown: false }} /> */}
    <Drawer.Screen name="VideoImageExtractor" options={{ headerShown: false }}>
      {(props) => <ProtectedRoute {...props} component={VideoImageExtractor} />}
    </Drawer.Screen>
    <Drawer.Screen name="VideoImageDisplay" options={{ headerShown: false }}>
      {(props) => <ProtectedRoute {...props} component={VideoImageDisplay} />}
    </Drawer.Screen>
    <Drawer.Screen name="saveVideo" options={{ headerShown: false }}>
      {(props) => <ProtectedRoute {...props} component={SaveVideo} />}
    </Drawer.Screen>
    {/* Add more screens here */}
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode:"cover"
  },
  container: {
    flex: 1,
    paddingLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    top: 30,
    gap:15,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Gill Sans", 
    color: '#fff',
    lineHeight:35,
    fontSize: 29,
 
  },
  closeDrawer: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: "#000133",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerHeader: {
    padding: 20,
    gap:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:40,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    // borderWidth:1,
    // borderColor:"#fff",
    backgroundColor:"#0071D9",
    justifyContent:"center",
    alignItems:"center"
  },

  userImage:{
    width: 33,
    height: 33,
  },

  username: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: "Gill Sans", 
    lineHeight:31
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "Gill Sans", 
    fontWeight:"bold",
    lineHeight:26
  },
});

export default DrawerNavigator;
