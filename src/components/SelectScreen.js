import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const styles = StyleSheet.create({
  dashGalMainDiv: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  dashGalTxt: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 16,
    color: '#63697b',
  },
  dash: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',

    height: 60,
    paddingTop: 15,
  },
  active: {
    borderBottomColor: '#f5a4a3',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 4,
    borderRightWidth: 0,
  },
  nonActive: {
    borderBottomColor: '#b4b2b2',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 4,
    borderRightWidth: 0,
  },
});

const SelectScreen = ({navigation}) => {
  const [isActive, setIsActive] = useState(false);
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

  const DashboardFunction = () => {
    setIsActive(false);
    navigation.navigate('Dashboard');
  };

  return (
    <View
      style={{
        ...styles.dashGalMainDiv,
        width: screenWidth,
        height: '12%',
      }}>
      <TouchableOpacity
        style={
          isActive === false
            ? {...styles.dash, ...styles.active}
            : {...styles.dash, ...styles.nonActive}
        }
        onPress={DashboardFunction}>
        <Text style={styles.dashGalTxt}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isActive === false
            ? {...styles.dash, ...styles.nonActive}
            : {...styles.dash, ...styles.active}
        }
        onPress={() => setIsActive(true)}>
        <Text style={styles.dashGalTxt}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectScreen;
