import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LeftAngle from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  SearchBarMainDiv: {
    backgroundColor: '#dd9392',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContDiv: {
    width: 220,
    backgroundColor: '#0000000f',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    height: 45,
    fontSize: 15,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  frndTxt: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 24,
    color: '#fff',
  },
});

const ContactHeader = ({navigation, headerName}) => {
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
          ? {...styles.SearchBarMainDiv, width: screenWidth, height: '10%'}
          : {...styles.SearchBarMainDiv, width: screenWidth, height: '18%'}
      }>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            <LeftAngle
              name="chevron-small-left"
              color="white"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.frndTxt}>{headerName}</Text>
      </View>
      <View style={styles.searchContDiv}>
        <View>
          <Text>
            <SearchIcon name="search" color="white" size={30} />
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.search}
            placeholder="Find Friends"
            placeholderTextColor={'white'}
          />
        </View>
      </View>
    </View>
  );
};

export default ContactHeader;
