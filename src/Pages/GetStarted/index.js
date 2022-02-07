import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import backgroundPic from '../../assets/journeyBackground.png';

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
  },
  head1: {
    fontFamily: 'Canaro-LightDEMO',
    color: 'white',
    fontSize: 46,
    fontWeight: '300',
    lineHeight: 50,
  },
  head2: {
    fontFamily: 'Canaro-LightDEMO',
    color: '#DD9392',
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 50,
  },
  para: {
    fontFamily: 'Canaro-LightDEMO',
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
  },
  button: {
    width: 248,
    height: 55,
    backgroundColor: '#fff',
    // height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    color: '#DD9392',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'garmond',
  },
  signText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'garmond',
  },
});

const letStartScreen = ({navigation}) => {
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

  return (
    <View>
      <View>
        <ImageBackground
          source={backgroundPic}
          style={
            orientation === 'PORTRAIT'
              ? {...styles.background, width: screenWidth, height: screenHeight}
              : {...styles.background, width: screenWidth, height: screenHeight}
          }>
          <ScrollView
            contentContainerStyle={
              orientation === 'PORTRAIT'
                ? {width: '100%', height: '100%', alignItems: 'center'}
                : {width: '100%', height: '90%'}
            }>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {marginTop: '25%'}
                  : {marginTop: '3%'}
              }>
              <Text style={styles.head1}>Our journey</Text>
              <Text style={styles.head2}>100 of Days I & A</Text>
            </View>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {width: '70%', marginTop: '73%'}
                  : {width: 250, marginTop: '5%'}
              }>
              <Text style={styles.para}>We are Women, our selfies roar...</Text>
            </View>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {marginTop: '10%', width: '100%'}
                  : {marginTop: '3%'}
              }>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.btnText}>Let's Start</Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {marginTop: '4%'}
                  : {marginTop: '1%'}
              }>
              <Text
                style={styles.signText}
                onPress={() => navigation.navigate('Login')}>
                Already have an Account? Sign in
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default letStartScreen;
