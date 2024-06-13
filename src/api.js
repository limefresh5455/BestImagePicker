import axios from 'axios';
import { Alert, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'; // For handling file uploads in React Native
import { API_URL } from '@env';

const uploadVideo = async (videoUri) => {

  const fileExtension = Platform.OS === 'ios' ? 'mov' : 'mp4'; // Adjust file extension based on platform
  try {
    const fileData = await RNFetchBlob.fs.readFile(videoUri, 'base64');
 
    const formData = new FormData();
    formData.append('video_file', {
      uri: videoUri,
      name: `dynamic_video.${fileExtension}`,
      type: `video/${fileExtension}`,
      data: RNFetchBlob.wrap(videoUri),
    });

    const response = await axios.post(`${API_URL}/process_video/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
      return response.data.best_image_paths;
  } catch (error) {
    console.error(error); // Log any errors
  }
};

export default uploadVideo;
