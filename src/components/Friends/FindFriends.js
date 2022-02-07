import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import profilePic from '../../assets/profilePic.png';
import ContactHeader from '../Headers/Contact';
import FindFriendsContent from './FindFriendsContent';

const FriendListData = [
  {
    displayPic: profilePic,
    name: 'Rose Henna',
    tierDay: '10',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
  {
    displayPic: profilePic,
    name: 'Affina Begum',
    tierDay: '06',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
  {
    displayPic: profilePic,
    name: 'Fernandez Ramos',
    tierDay: '26',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
  {
    displayPic: profilePic,
    name: 'Rose Henna',
    tierDay: '30',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
  {
    displayPic: profilePic,
    name: 'Rose Henna',
    tierDay: '15',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
  {
    displayPic: profilePic,
    name: 'Rose Henna',
    tierDay: '01',
    discription: 'loren epsium how are doing my brother wgats going on',
  },
];

const styles = StyleSheet.create({
  MainContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // backgroundColor:'grey',
    backgroundColor: '#f9f9f9',
  },
});

const FindFriends = ({navigation}) => {
  const headerName = 'Find Friends';
  return (
    <View style={styles.MainContainer}>
      <ContactHeader headerName={headerName} navigation={navigation} />

      <View style={{width: '100%', height: '82%', backgroundColor: '#f9f9f9'}}>
        <ScrollView>
          {FriendListData.map((value, index) => {
            return (
              <>
                <FindFriendsContent value={value} index={index} key={index} />
              </>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FindFriends;
