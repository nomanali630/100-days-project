import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LeftAngle from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  SearchBarMainDiv: {
    width: Dimensions.get('window').width,
    backgroundColor: '#dd9392',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchContDiv: {
    width: '85%',
    backgroundColor: '#0000000f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    fontSize: 15,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
});

const MessageHeader = ({navigation}) => {
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
          ? {...styles.SearchBarMainDiv, height: '10%'}
          : {...styles.SearchBarMainDiv, height: '18%'}
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
      <View style={styles.searchContDiv}>
        <View style={{width: '90%'}}>
          <TextInput
            style={styles.search}
            placeholder="Search.."
            placeholderTextColor={'white'}
          />
        </View>
        <View style={{width: '10%'}}>
          <Text>
            <SearchIcon name="search" color="white" size={30} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MessageHeader;
