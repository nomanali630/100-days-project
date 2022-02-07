import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Edit from 'react-native-vector-icons/AntDesign';

const ImageUploader = ({setState}) => {
  const selectPhotoTapped = async () => {
    const options = {
      title: 'Select Photo',

      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        uploadImage(response?.[`assets`]?.[0]);
      }
    });
  };
  const uploadImage = async image => {
    const uri = image.uri;
    const type = image.type;
    const name = 'sssss';
    const source = {
      uri,
      type,
      name,
    };
    const data = new FormData();
    data.append('file', source);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'dg8ikrdpa');
    fetch('https://api.cloudinary.com/v1_1/dg8ikrdpa/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setState(data);
      });
  };

  // return selectPhotoTapped;
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: '80%',
        left: '20%',
        backgroundColor: '#E29796',
        borderRadius: 100,
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => selectPhotoTapped()}>
      <Text>
        <Edit name="edit" color="#FBFBFB" size={24} />
      </Text>
    </TouchableOpacity>
  );
};

export default ImageUploader;
