import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Gmail from '../../assets/gmail.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginMutation, signUpMutation} from '../../@graphql/mutations/mutation';
import {showMessage} from 'react-native-flash-message';
import {withContext} from '../../Context/appContext';

const GoogleLogin = ({navigation, Loader, setToken, refetchCurrentUser}) => {
  const [userData, setUserData] = useState({});

  const [SignUpUser] = useMutation(signUpMutation, {
    onCompleted: res => {
      console.log(res, 'Signup');
      AsyncStorage.setItem('Token', res.signUp.token).then(() => {
        refetchCurrentUser();
      });
      setToken(res.signUp.token);
      Loader(false);
    },
    onError: ({message}) => {
      console.log(message, 'signup');
      Loader(false);
      showMessage({
        message: message,
        type: 'danger',
      });
    },
  });

  const [LoginUser] = useMutation(loginMutation, {
    onCompleted: res => {
      console.log(res, 'Login');
      AsyncStorage.setItem('Token', res.login.token).then(() => {
        refetchCurrentUser();
      });
      setToken(res.login.token);
      Loader(false);
      // navigation.navigate('Home');
    },
    onError: ({message}) => {
      console.log(message, 'login');
      if (message.toString().includes('No such user found')) {
        const Image = {
          access_mode: 'Google Signup',
          secure_url: userData?.photo,
          encoding: 0,
          mimetype: 'GoogleSignin',
        };
        SignUpUser({
          variables: {
            firstName: userData.givenName,
            lastName: userData.familyName,
            email: userData.email,
            password: userData.id,
            ProfilePicture: Image,
          },
        });
      } else {
        Loader(false);
        showMessage({
          message: message,
          type: 'danger',
        });
      }
    },
  });

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //   console.log('googleUser', {...userInfo.user});
      const User = {...userInfo.user};
      console.log('googleUser..', User);
      setUserData(User);
      Loader(true);
      LoginUser({
        variables: {
          email: User.email,
          password: User.id,
        },
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => signIn()}>
        <Image source={Gmail} style={{width: 42, height: 42}} />
      </TouchableOpacity>
    </View>
  );
};

export default withContext(GoogleLogin);

const styles = StyleSheet.create({});
