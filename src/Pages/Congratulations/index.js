import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CongoBack from '../../assets/congoBack.png';
import countDivPic from '../../assets/countDivBack.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 900,
    alignItems: 'center',
  },
  congratsMainDiv: {
    width: Dimensions.get('window').width - 5,
    height: 328,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 1,
    marginTop: 160,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  countPicDiv: {
    width: 106,
    height: 106,
    borderRadius: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDiv: {
    width: 105,
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#efbd34',
    fontSize: 45,
  },
  congratesText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 37,
    color: '#1d1d1d',
  },
  messageText: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 15,
    color: '#000',
    opacity: 0.3,
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: 180,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },
});

const Congratulations = () => {
  return (
    <View>
      <ImageBackground source={CongoBack} style={styles.container}>
        <View style={styles.congratsMainDiv}>
          <View style={styles.countPicDiv}>
            <ImageBackground source={countDivPic} style={styles.countDiv}>
              <View>
                <Text style={styles.countText}>100</Text>
              </View>
            </ImageBackground>
          </View>
          <View>
            <Text style={styles.congratesText}>Congratulations</Text>
            <Text style={styles.messageText}>
              You have completed 100 days challenge
            </Text>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.button}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Congratulations;
