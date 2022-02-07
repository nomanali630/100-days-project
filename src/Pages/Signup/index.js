import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import backgroundPic from '../../assets/signBackground.png';
// import CheckBox from '@react-native-community/checkbox';
import {signUpMutation} from '../../@graphql/mutations/mutation';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';

import Eye from 'react-native-vector-icons/AntDesign';
// import DatePickerFunction from './DatePicker/DatePicker';

import Orline from '../../assets/orline.png';
import FacebookLogin from '../../components/social/FacebookLogin';
import Apple from '../../assets/apple.png';
import GoogleLogin from '../../components/social/GoogleLogin';
import EyeWithLine from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withContext} from '../../Context/appContext';

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  sign: {
    fontSize: 36,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'Canaro-LightDEMO',
  },
  para: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'garmond',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  email: {
    // height: 45,
    margin: 12,
    fontSize: 20,
    borderWidth: 2,
    // padding: 10,
    borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  pass: {
    // height: 45,
    marginTop: 12,
    fontSize: 20,

    // borderWidth: 2,
    // padding: 10,
    // borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: 305,
    height: 60,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const SignUp = ({navigation, refetchCurrentUser, setToken}) => {
  const [isSelected, setSelection] = useState(false);
  const [loader, setLoader] = useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hideEye, setHideEye] = useState(true);
  const [screenWidth, setscreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setscreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [filePath, setFilePath] = useState(null);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  useEffect(() => {
    setscreenWidth(Dimensions.get('window').width);
    setscreenHeight(Dimensions.get('window').height);
  }, [orientation]);

  const [SignUpUser] = useMutation(signUpMutation, {
    onCompleted: res => {
      setLoader(false);
      console.log(res);
      AsyncStorage.setItem('Token', res.signUp.token).then(() => {
        refetchCurrentUser();
      });
      setToken(res.signUp.token);
      // navigation.navigate('login');

      showMessage({
        message: 'Sign Up Successfully',
        type: 'success',
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setDateOfBirth('');
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
  const handleSignUp = e => {
    if (FirstName && LastName && email && password) {
      if (email.includes('@')) {
        setLoader(true);
        SignUpUser({
          variables: {
            firstName: FirstName,
            lastName: LastName,
            email: email,
            password: password,
            // ProfilePicture: filePath,
          },
        });
      } else {
        showMessage({
          message: 'Please enter a valid email',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Please fill all the fields to Sign up',
        type: 'danger',
      });
    }
  };

  return (
    <ImageBackground
      source={backgroundPic}
      style={{
        ...styles.background,
        width: screenWidth,
        height: screenHeight,
      }}>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={10}>
        <ScrollView
          contentContainerStyle={{alignItems: 'center', width: '100%'}}
          keyboardShouldPersistTaps={'handled'}>
          {loader === true ? (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={{alignItems: 'center', width: '100%'}}>
              <View style={{marginTop: 70, alignItems: 'center'}}>
                <View>
                  <Text style={styles.sign}>Sign up Now!</Text>
                </View>
                <View style={{width: 300}}>
                  <Text style={styles.para}>
                    Become the best version of yourself
                  </Text>
                </View>
              </View>
              {/* <View style={{width: Dimensions.get('window').width}}>
                <ImageUploader setState={setFilePath} />
                {filePath && filePath?.secure_url && 
                <Image source={{uri:filePath.secure_url}} />
                }
              </View> */}
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                }}>
                <TextInput
                  style={styles.email}
                  selectionColor={'#dd9392'}
                  placeholder="First Name"
                  value={FirstName}
                  placeholderTextColor={'white'}
                  onChangeText={e => setFirstName(e)}
                />
              </View>

              <View style={{width: '100%'}}>
                <TextInput
                  style={styles.email}
                  selectionColor={'#dd9392'}
                  placeholder="Last Name"
                  value={LastName}
                  placeholderTextColor={'white'}
                  onChangeText={e => setLastName(e)}
                />
              </View>
              <View style={{width: '100%'}}>
                <TextInput
                  style={styles.email}
                  selectionColor={'#dd9392'}
                  placeholder="Email"
                  value={email}
                  placeholderTextColor={'white'}
                  onChangeText={e => setEmail(e)}
                />
              </View>

              <View
                style={
                  orientation === 'PORTRAIT'
                    ? {
                        width: '92%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomWidth: 2,
                        borderColor: 'white',
                        marginBottom: 12,
                      }
                    : {
                        width: '96%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomWidth: 2,
                        borderColor: 'white',
                        marginBottom: 12,
                      }
                }>
                <View style={{width: '90%'}}>
                  <TextInput
                    style={styles.pass}
                    selectionColor={'#dd9392'}
                    secureTextEntry={hideEye}
                    placeholder="Password"
                    value={password}
                    placeholderTextColor={'white'}
                    onChangeText={e => setPassword(e)}
                  />
                </View>
                <View style={{width: '10%'}}>
                  {!hideEye ? (
                    <TouchableOpacity onPress={() => setHideEye(!hideEye)}>
                      <Eye name="eyeo" color="white" size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setHideEye(!hideEye)}>
                      <EyeWithLine
                        name="eye-with-line"
                        color="white"
                        size={20}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View
                style={
                  orientation === 'PORTRAIT'
                    ? {
                        alignSelf: 'flex-end',
                        marginTop: '2%',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }
                    : {
                        alignSelf: 'flex-end',
                        marginTop: '8%',
                        justifyContent: 'flex-end',
                        width: '100%',
                        height: '15%',
                      }
                }>
                <View
                  style={
                    orientation === 'PORTRAIT'
                      ? {
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: '10%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }
                      : {
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: '5%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }
                  }>
                  <View style={{marginRight: 21}}>
                    <FacebookLogin navigation={navigation} />
                  </View>
                  <View>
                    <GoogleLogin Loader={setLoader} navigation={navigation} />
                  </View>
                  <View style={{marginLeft: 21}}>
                    <Image source={Apple} style={{width: 42, height: 42}} />
                  </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image source={Orline} style={{width: '92%', height: 43}} />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleSignUp()}>
                  <Text style={styles.button}>Create an Account</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.label}> Login from here </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default withContext(SignUp);
