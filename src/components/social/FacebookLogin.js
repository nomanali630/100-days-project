import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Facebook from '../../assets/facebook.png';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const FacebookLogin = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
      'user_friends',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          onFacebookButtonPress()
            .then(() => console.log('Signed in with Facebook!'))
            .catch(err => console.log({err}))
        }>
        <Image source={Facebook} style={{width: 42, height: 42}} />
      </TouchableOpacity>
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
