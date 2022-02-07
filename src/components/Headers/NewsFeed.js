import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BelliconSvg from '../SVG/belliconSvg';
import headLogo from '../../assets/headLogo.png';

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  logoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headLogoPic: {
    width: 29,
    height: 35,
  },
  bell: {
    width: 24,
    height: 24,
  },
  headText: {
    fontSize: 20,
    color: '#090909',
    marginLeft: 10,
  },
});

const NewsFeedHeader = ({navigation}) => {
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
    <View
      style={
        orientation === 'PORTRAIT'
          ? {...styles.headerSection, height: '10%', width: '100%'}
          : {...styles.headerSection, height: '18%', width: '100%'}
      }>
      <View style={styles.logoContent}>
        <Image source={headLogo} style={styles.headLogoPic} />
        <Text style={styles.headText}>100 Days of I & A</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <BelliconSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsFeedHeader;
