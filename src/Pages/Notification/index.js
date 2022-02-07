import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import profilePicture from '../../assets/profilePic.png';
import NotificationContent from '../../components/NotificationScreen/NotificationContent';
import NotificationHeader from '../../components/Headers/Notification';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
});

const NOTIFICATION_DATA = [
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
  {
    profilePicture: profilePicture,
    personName: 'Fernandez Ramos',
    notiAction: 'Posted a photo',
    dayTier: 'of 11 days tier',
    notiTime: 'yesterday at 9:00',
  },
];

const Notification = ({navigation}) => {
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
            ? {...styles.container, height: screenHeight, width: screenWidth}
            : {...styles.container, height: screenHeight, width: screenWidth}
        }>
        <NotificationHeader />

        <View
          style={
            orientation === 'PORTRAIT'
              ? {height: '82%', width: '100%', backgroundColor: '#f9f9f9'}
              : {height: '60%', width: '100%', backgroundColor: '#f9f9f9'}
          }>
          <ScrollView>
            {NOTIFICATION_DATA.map((v, i) => {
              return (
                <NotificationContent
                  v={v}
                  i={i}
                  navigation={navigation}
                  key={i}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Notification;
