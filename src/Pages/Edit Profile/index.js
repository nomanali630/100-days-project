import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Headers/Contact';
import avatarPic from '../../assets/avatar.jpg';
import crossPic from '../../assets/crossPic.png';
import ImageUploader from '../../components/imagePicker/ImagePicker';
import {
  CreateBioMutation,
  updateUserMutation,
} from '../../@graphql/mutations/friend';
import {useMutation} from '@apollo/client';
import {withContext} from '../../Context/appContext';
import {showMessage} from 'react-native-flash-message';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../components/Loader/Loader';

const styles = StyleSheet.create({
  MainContainer: {
    width: '100%',
    height: '100%',
  },
  ContentContainer: {
    width: Dimensions.get('window').width,
    height: '90%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageCircle: {
    borderWidth: 2,
    borderColor: '#F5A4A3',
    width: 139,
    height: 139,
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  inputField: {
    height: 41,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#D4D4D4',
    backgroundColor: '#FBFBFB',
    color: 'black',
  },
  labelText: {
    fontSize: 19,
    fontFamily: 'Canaro-LightDEMO',
    marginLeft: '10%',
    color: '#19295C',
  },

  inputFieldBioConatiner: {
    margin: 12,
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#D4D4D4',
    backgroundColor: '#FBFBFB',
  },
  inputFieldBio: {
    height: 93,
    textAlignVertical: 'top',
    color: 'black',
  },

  SaveSettingBtn: {
    width: '38%',
    height: 40,
    backgroundColor: '#EFA4A3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    marginLeft: '10%',
  },
  resetBtn: {
    width: '38%',
    height: 40,
    borderColor: '#EFA4A3',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    marginLeft: '1%',
  },
  hashTagsContainer: {
    backgroundColor: '#EFA4A3',
    borderRadius: 19,
    padding: 8,
    marginLeft: 3,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const EditProfile = ({refetchCurrentUser, currentUser}) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userUpdatedPic, setUserUpdatedPic] = useState(null);
  const [Bio, setBio] = useState('');
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [hashTagInput, setHashTagInput] = useState('');
  const [tagsArr, setTagsArr] = useState([]);
  const [items, setItems] = useState([
    {label: 'one year', value: 'apple'},
    {label: 'one month', value: 'banana'},
  ]);

  useEffect(() => {
    if (currentUser) {
      setUserFirstName(currentUser.loggedInUser.firstName);
      setUserLastName(currentUser.loggedInUser.lastName);
      setBio(currentUser?.loggedInUser?.Bio?.Text);
      if (
        currentUser?.loggedInUser?.ProfilePicture &&
        currentUser?.loggedInUser?.ProfilePicture.length >= 1
      ) {
        const Image =
          currentUser.loggedInUser.ProfilePicture[
            currentUser.loggedInUser.ProfilePicture.length - 1
          ];
        setUserUpdatedPic({
          secure_url: Image.filename,
        });
      }
    } else {
      refetchCurrentUser();
    }
  }, []);

  const [updateUser] = useMutation(updateUserMutation, {
    onCompleted: res => {
      console.log(res.updateUser.message);
      setLoader(false);
      showMessage({
        message: res.updateUser.message,
        type: res.updateUser.success ? 'success' : 'danger',
      });
      if (res.updateUser.success) {
        refetchCurrentUser();
      }
    },
    onError: res => {
      console.log(res);
      setLoader(false);
      showMessage({
        message: res.toString(),
        type: 'danger',
      });
    },
  });

  const [ChangeBio] = useMutation(CreateBioMutation, {
    onCompleted: res => {
      console.log(res.CreateBio.message, 'complete');
      // setLoader(false);
      // showMessage({
      //   message: res.CreateBio.message,
      //   type: res.CreateBio.success ? 'success' : 'danger',
      // });
      // if (res.CreateBio.success) {
      //   refetchCurrentUser();
      // }
    },
    onError: res => {
      setLoader(false);
      console.log(res);
      showMessage({
        message: res.toString(),
        type: 'danger',
      });
    },
  });
  const handleUpdateUser = () => {
    setLoader(true);
    if (userUpdatedPic && userUpdatedPic.access_mode) {
      if (userUpdatedPic.secure_url) {
        updateUser({
          variables: {
            firstName: userFirstName,
            lastName: userLastName,
            ...(userUpdatedPic.secure_url !=
            currentUser?.loggedInUser?.ProfilePicture[
              currentUser?.loggedInUser?.ProfilePicture.length - 1
            ].filename
              ? {
                  ProfilePicture: userUpdatedPic,
                }
              : null),
          },
        });
      }
    } else {
      updateUser({
        variables: {
          firstName: userFirstName,
          lastName: userLastName,
        },
      });
    }
    ChangeBio({
      variables: {
        Text: Bio,
      },
    });
  };

  const AddedHashTags = addedTags => {
    if (addedTags.includes(' ')) {
      if (addedTags != ' ') {
        let tagText = addedTags.trim();
        setTagsArr([...tagsArr, tagText]);
        setHashTagInput('');
      }
    } else {
      setHashTagInput(addedTags);
    }
  };
  const removeTag = index => {
    let array = [];
    array = [...tagsArr];
    array.splice(index, 1);
    setTagsArr(array);
  };

  return (
    <View style={styles.MainContainer}>
      <Header headerName={'Edit Profile'} />
      <View style={styles.ContentContainer}>
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get('window').width,
            alignItems: 'center',
          }}
          keyboardShouldPersistTaps={'handled'}>
          {loader ? <Loader /> : null}
          <View style={{position: 'relative'}}>
            <View style={styles.imageCircle}>
              <Image
                source={
                  userUpdatedPic
                    ? {
                        uri: userUpdatedPic.secure_url,
                      }
                    : avatarPic
                }
                style={{width: 126, height: 126, borderRadius: 100}}
              />
            </View>
            <ImageUploader setState={setUserUpdatedPic} />
          </View>
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              style={styles.inputField}
              value={userFirstName}
              placeholderTextColor={'grey'}
              placeholder="Allen"
              onChangeText={text => setUserFirstName(text)}
            />
          </View>
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Kelvin"
              value={userLastName}
              placeholderTextColor={'grey'}
              onChangeText={text => setUserLastName(text)}
            />
          </View>
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text style={styles.labelText}>Bio</Text>
            <View style={styles.inputFieldBioConatiner}>
              <TextInput
                multiline={true}
                style={styles.inputFieldBio}
                value={Bio}
                placeholderTextColor={'grey'}
                onChangeText={text => setBio(text)}
                placeholder="Lorem, ipsum or lipsum as it ias"
              />
            </View>
          </View>
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text style={styles.labelText}>Added Hashtags</Text>
            <TextInput
              value={hashTagInput}
              style={styles.inputField}
              placeholderTextColor={'grey'}
              placeholder="hashtags"
              onChangeText={addedTags => AddedHashTags(addedTags)}
            />
            <View style={{width: '100%'}}>
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignSelf: 'center',
                }}>
                {tagsArr.map((tagsAdded, index) => {
                  return (
                    <View style={styles.hashTagsContainer} key={index}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Canaro-LightDEMO',
                        }}>
                        {tagsAdded}
                      </Text>
                      <TouchableOpacity onPress={() => removeTag(index)}>
                        <Image
                          source={crossPic}
                          style={{width: 10, height: 10, marginLeft: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{width: '100%', marginTop: '10%'}}>
            <Text style={styles.labelText}>Change your goal</Text>
            <DropDownPicker
              style={styles.inputField}
              placeholder="Goals"
              placeholderTextColor={'grey'}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: '10%',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            <View style={styles.SaveSettingBtn}>
              <TouchableOpacity onPress={() => handleUpdateUser()}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Canaro-LightDEMO',
                    fontSize: 16,
                  }}>
                  Save Settings
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resetBtn}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#EFA4A3',
                    fontFamily: 'Canaro-LightDEMO',
                    fontSize: 16,
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default withContext(EditProfile);
