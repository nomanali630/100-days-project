import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BelliconSvg from '../SVG/belliconSvg';

const styles = StyleSheet.create({
  headerMainDiv: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 0.5,
  },
  headerText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 24,
    color: '#1d1d1d',
    marginLeft: 10,
  },
});

const NotificationHeader = () => {
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
          ? {...styles.headerMainDiv, height: '10%', width: screenWidth}
          : {...styles.headerMainDiv, height: '17%', width: screenWidth}
      }>
      <View style={{marginLeft: 15}}>
        <BelliconSvg />
      </View>
      <Text style={styles.headerText}>Notification</Text>
    </View>
  );
};

export default NotificationHeader;
