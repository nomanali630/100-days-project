import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import imgProfile2 from '../assets/img2.png';
import imgProfile3 from '../assets/img3.png';
import imgProfile4 from '../assets/img4.png';
import imgProfile5 from '../assets/img5.png';
import imgProfile6 from '../assets/img6.png';
import imgProfile7 from '../assets/img7.png';
import {withContext} from '../Context/appContext';
import AvatarPic from '../assets/avatar.jpg';
import paw1 from '../assets/paw-print.png';
import paw2 from '../assets/paw-print2.png';
import paw3 from '../assets/paw-print3.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, currentUser, setToken}) => {
  const array = [
    imgProfile2,
    imgProfile3,

    imgProfile4,
    imgProfile5,
    imgProfile6,
    imgProfile7,

    imgProfile2,
    imgProfile3,

    imgProfile4,
    imgProfile5,
    imgProfile6,
    imgProfile7,

    imgProfile2,
    imgProfile3,

    imgProfile4,
    imgProfile5,
    imgProfile6,
    imgProfile7,
  ];

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
    <>
      <View
        style={
          orientation === 'PORTRAIT'
            ? {...styles.profile, width: screenWidth}
            : {...styles.profile, width: screenWidth, height: screenHeight}
        }>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.ProfileImage}>
            <Image
              source={
                currentUser?.loggedInUser?.ProfilePicture &&
                currentUser?.loggedInUser?.ProfilePicture.length >= 1
                  ? {
                      uri: currentUser?.loggedInUser?.ProfilePicture[
                        currentUser?.loggedInUser?.ProfilePicture.length - 1
                      ].filename,
                    }
                  : AvatarPic
              }
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          </View>
          <View style={styles.ProfileDetail}>
            <View style={styles.mainheading}>
              <Text style={styles.mainHeadingInner}>
                {currentUser?.loggedInUser?.firstName}
              </Text>

              <Text style={styles.mainHeadingInner}>
                {currentUser?.loggedInUser?.lastName}
              </Text>
            </View>
            <View style={styles.mainDetailText}>
              <Text style={styles.detailText}>
                {currentUser?.loggedInUser?.Bio?.Text
                  ? currentUser?.loggedInUser?.Bio?.Text
                  : ''}
              </Text>
            </View>
            <View style={styles.iconsDiv}>
              <Image source={paw3} resizeMode="contain" />
              <Image source={paw2} resizeMode="contain" />
              <Image source={paw1} resizeMode="contain" />
            </View>

            <View style={styles.colorDiv}>
              <View style={styles.color2}></View>
              <View style={styles.color1}>
                <Text style={styles.textColor}>28</Text>
              </View>
              <View style={styles.color3}></View>
              <View style={styles.color4}></View>
              <View style={styles.color5}></View>
              <View style={styles.color6}></View>
              <View style={styles.color7}></View>
              <View style={styles.color8}></View>
              <View style={styles.color9}></View>
              <View style={styles.color10}></View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.btnMain}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.msgText}> Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.EditBtn}
                onPress={() => {
                  AsyncStorage.removeItem('Token');
                  setToken(null);
                }}>
                <Text style={styles.msgText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={
              orientation === 'LANDSCAPE'
                ? {width: '100%', height: '40%'}
                : {width: '100%'}
            }>
            <View style={{...styles.cardImages}}>
              {array.map(items => (
                <View style={styles.cards}>
                  <Image
                    source={items}
                    resizeMode="cover"
                    style={{width: '100%', borderRadius: 10}}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default withContext(Profile);

const styles = StyleSheet.create({
  cards: {
    width: '33%',
    // height:95,
    borderRadius: 10,
    marginTop: 4,
    // marginHorizontal:0
  },
  cardImages: {
    width: '100%',
    // height:600,
    paddingHorizontal: 8,
    paddingVertical: 10,
    // height:278,
    backgroundColor: '#F9F9F9',
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },
  btnMain: {
    width: 150,
    height: 38,
    backgroundColor: '#EFA4A3',
    borderRadius: 19,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EditBtn: {
    width: 150,
    height: 38,
    backgroundColor: '#EFA4A3',
    borderRadius: 19,
    alignSelf: 'center',
    // marginTop: 20,
    // marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  msgText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'garmond',
  },
  textColor: {
    fontSize: 20,
    fontFamily: 'garmond',
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    textAlign: 'center',
  },
  colorDiv: {
    width: 186,
    height: 36,
    marginTop: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  color1: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#FC63C9',
  },
  color2: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#08F6E7',
  },
  color3: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#FDF109',
  },
  color4: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#8A08F2',
  },
  color5: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#FBC000',
  },
  color6: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#FB1520',
  },
  color7: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#2FA3DE',
  },
  color8: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#3FFD2B',
  },
  color9: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#000002',
  },
  color10: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#DA9291',
  },
  iconsDiv: {
    width: 101.8,
    marginTop: 10,
    height: 24,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainheading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mainHeadingInner: {
    fontSize: 26,
    fontFamily: 'garmond',
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  mainDetailText: {
    width: 236,
    marginTop: 10,
    color: 'black',
    // alignSelf: 'center',
    alignItems: 'center',
  },

  detailText: {
    fontFamily: 'garmond',
    lineHeight: 17,
    fontSize: 14,
    color: 'black',
  },
  ProfileImage: {
    borderWidth: 2,
    borderColor: '#F5A4A3',
    width: 108,
    height: 108,
    borderRadius: 100,
    justifyContent: 'center',
    padding: 3,
    marginTop: 20,
  },
  ProfileDetail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
