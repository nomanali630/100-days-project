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
import {Forgot_Password} from '../../@graphql/mutations/mutation';
import {showMessage} from 'react-native-flash-message';

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

const ForgotPassword = ({navigation}) => {
  // const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false);
  // const [hideEye, setHideEye] = useState(true)

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

  const [Forgot] = useMutation(Forgot_Password, {
    onCompleted: res => {
      setLoader(false);
      showMessage({
        message: res.forgotPassword.message,
        type: res.forgotPassword.success ? 'success' : 'danger',
      });
      if (res.forgotPassword.success) {
        navigation.navigate('ResetForgotPassword');
      }
    },
    onError: res => {
      setLoader(false);
      console.log(res);
      alert(res);
    },
  });
  const handleForgot = e => {
    if (email) {
      setLoader(true);
      Forgot({
        variables: {
          email: email,
        },
      });
      setEmail('');
      // setPassword('')
    } else {
      alert('please add email ');
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
                    <Text style={styles.sign}>Forgot Password</Text>
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
                      placeholder="Email"
                      placeholderTextColor={'white'}
                      onChangeText={e => setEmail(e)}
                    />
                  </View>
                  <View style={{marginTop: 70}}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={handleForgot}>
                      <Text style={styles.button}>Send Mail</Text>
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

export default ForgotPassword;
