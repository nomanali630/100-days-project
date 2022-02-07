import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import backgroundPic from '../../assets/signBackground.png';
import CheckBox from '@react-native-community/checkbox';
import {loginMutation} from '../../@graphql/mutations/mutation';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Eye from 'react-native-vector-icons/AntDesign';
import EyeWithLine from 'react-native-vector-icons/Entypo';
import Orline from '../../assets/orline.png';
import FacebookLogin from '../../components/social/FacebookLogin';
import Apple from '../../assets/apple.png';
import {showMessage} from 'react-native-flash-message';
import {withContext} from '../../Context/appContext';
import GoogleLogin from '../../components/social/GoogleLogin';

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  sign: {
    fontSize: 36,
    color: '#fff',

    fontFamily: 'Canaro-LightDEMO',
    lineHeight: 39,
  },
  para: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Canaro-LightDEMO',
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 35,
  },
  email: {
    fontSize: 18,
    borderWidth: 2,
    padding: 0,
    paddingBottom: 4,

    borderColor: 'white',
    color: '#fff',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    letterSpacing: 0.4,
  },
  pass: {
    fontSize: 18,
    padding: 10,
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    paddingBottom: 4,
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: '92%',

    height: 60,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Canaro-LightDEMO',
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
  forgotText: {
    fontSize: 14,
    color: 'white',
  },
  forgotDiv: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
});

const Login = ({navigation, refetchCurrentUser, setToken, token}) => {
  const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [hideEye, setHideEye] = useState(true);

  const [screenWidth, setscreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setscreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [orientation, setOrientation] = useState('PORTRAIT');

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

  const [LoginUser] = useMutation(loginMutation, {
    onCompleted: res => {
      AsyncStorage.setItem('Token', res.login.token).then(() => {
        refetchCurrentUser();
      });
      setToken(res.login.token);
      setLoader(false);
      setEmail('');
      setPassword('');
    },
    onError: ({message}) => {
      setLoader(false);
      console.log(message);
      showMessage({
        message: message,
        type: 'danger',
      });
    },
  });
  const handleLogin = e => {
    if (email && password) {
      setLoader(true);
      LoginUser({
        variables: {
          email: email,
          password: password,
        },
      });
    } else {
      showMessage({
        message: 'please add password and email to login',
        type: 'danger',
      });
    }
  };
  return (
    <View>
      <ImageBackground
        source={backgroundPic}
        style={{
          ...styles.background,
          width: screenWidth,
          height: screenHeight,
        }}>
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={10}>
          <ScrollView
            contentContainerStyle={
              orientation === 'PORTRAIT' ? {width: '100%'} : null
            }
            keyboardShouldPersistTaps={'handled'}>
            {loader === true ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View
                style={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={
                    orientation === 'PORTRAIT'
                      ? {marginTop: '32%', alignItems: 'center'}
                      : {marginTop: '5%', alignItems: 'center', height: '15%'}
                  }>
                  <View>
                    <Text style={styles.sign}>Login Now!</Text>
                  </View>
                  <View style={{width: 300}}>
                    <Text style={styles.para}>
                      Become the best version of yourself
                    </Text>
                  </View>
                </View>
                <View
                  style={{alignItems: 'center', width: '100%', height: '40%'}}>
                  <View
                    style={
                      orientation === 'PORTRAIT'
                        ? {width: '92%', marginTop: '18%'}
                        : {width: '92%', marginTop: '5%'}
                    }>
                    <TextInput
                      selectionColor={'#dd9392'}
                      style={styles.email}
                      placeholder="Email"
                      placeholderTextColor={'white'}
                      value={email}
                      onChangeText={e => setEmail(e)}
                    />
                  </View>
                  <View
                    style={{
                      width: '92%',
                      marginTop: 38,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 2,
                      borderColor: 'white',
                    }}>
                    <View style={{width: '92%'}}>
                      <TextInput
                        selectionColor={'#dd9392'}
                        style={styles.pass}
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
                  <TouchableOpacity
                    style={styles.forgotDiv}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 38,
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={handleLogin}>
                      <Text style={styles.button}>Login</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}
                      tintColors="white"
                      onCheckColor="grey"
                    />
                    <Text style={styles.label}>
                      Disclosure privacy agreement
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    orientation === 'PORTRAIT'
                      ? {
                          alignSelf: 'flex-end',
                          marginTop: '15%',
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
                  <View style={{width: '100%'}}>
                    <Image
                      source={Orline}
                      style={{width: '100%', height: 43}}
                    />
                  </View>
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
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default withContext(Login);
