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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import backgroundPic from '../../assets/signBackground.png';
import {useMutation} from '@apollo/client';
import Eye from 'react-native-vector-icons/AntDesign';
import {Reset_Forgot_Password} from '../../@graphql/mutations/mutation';
import EyeWithLine from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  sign: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Cinzel Decorative',
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
    padding: 10,
    borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  pass: {
    // height: 45,
    // margin: 12,
    fontSize: 20,
    // borderWidth: 2,
    padding: 10,
    // borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: 350,
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
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: 'white',
    fontSize: 18,
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

const ResetForgotPassword = ({navigation}) => {
  // const [isSelected, setSelection] = useState(false);
  const [token, setToken] = useState('');
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

  const [Forgot] = useMutation(Reset_Forgot_Password, {
    onCompleted: res => {
      console.log(res);
      setLoader(false);
      alert(JSON.stringify(res.message));
      //  navigation.navigate('SelectSubscription')
    },
    onError: res => {
      setLoader(false);
      console.log(res);
      alert(JSON.stringify(res.message));
    },
  });
  const handleResetForgot = e => {
    if (token && password) {
      setLoader(true);
      Forgot({
        variables: {
          token: token,
          newPassword: password,
        },
      });
      setToken('');
      setPassword('');
    } else {
      alert('please add password ');
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <View>
        <ImageBackground
          source={backgroundPic}
          style={{
            ...styles.background,
            width: screenWidth,
            height: screenHeight,
          }}>
          <ScrollView>
            {loader === true ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View>
                <View style={{marginTop: 50, alignItems: 'center'}}>
                  <View>
                    <Text style={styles.sign}>Reset Forgot Password</Text>
                  </View>
                  <View style={{width: 300}}>
                    <Text style={styles.para}>
                      Become the best version of yourself
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: Dimensions.get('window').width,
                      marginTop: 50,
                    }}>
                    <TextInput
                      style={styles.email}
                      placeholder="Token"
                      placeholderTextColor={'white'}
                      onChangeText={e => setToken(e)}
                    />
                  </View>
                  <View
                    style={{
                      width: Dimensions.get('window').width,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 2,
                      borderColor: 'white',
                    }}>
                    <View style={{width: '90%'}}>
                      <TextInput
                        style={styles.pass}
                        secureTextEntry={hideEye}
                        placeholder=" New Password"
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
                  <View style={{marginTop: 70}}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={handleResetForgot}>
                      <Text style={styles.button}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={styles.label}
                    onPress={() => navigation.navigate('Login')}>
                    back to login
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetForgotPassword;
