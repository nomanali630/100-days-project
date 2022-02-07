import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import messagePic from '../../assets/messagePic.png';
import MessageHeader from '../../components/Headers/Message';
import MessageContent from '../../components/MessageScreen/MessageContent';

const styles = StyleSheet.create({
  MainContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
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
  messageHeadingMAindiv: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  messHeading: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 28,
    color: '#000',
  },
  headMessText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 14,
    color: '#000',
    opacity: 0.36,
  },
  messageMainDiv: {
    width: Dimensions.get('window').width,
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  messageName: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'garmond',
    fontWeight: 'normal',
    color: '#000',
    opacity: 0.3,
  },
  messageContnt: {
    fontSize: 13,
    fontFamily: 'Canaro-LightDEMO',
    color: '#000',
    opacity: 0.4,
    marginLeft: 8,
  },
});
const MessageData = [
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: 'Now',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: 'Now',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: 'Now',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: 'Now',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: 'Now',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
  {
    messageProfilePic: messagePic,
    messengerName: 'Julian Dasilva',
    messageTime: '5 days ago',
    messageContent: 'Hi Julian see u later',
  },
];

const Message = ({navigation}) => {
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
          ? {width: screenWidth, height: screenHeight}
          : {width: screenWidth, height: screenHeight}
      }>
      <MessageHeader navigation={navigation} />

      <View
        style={
          orientation === 'PORTRAIT'
            ? {...styles.messageHeadingMAindiv, height: '15%'}
            : {...styles.messageHeadingMAindiv, height: '18%'}
        }>
        <Text style={styles.messHeading}>Messages</Text>
        <Text style={styles.headMessText}>You have 2 new messages</Text>
      </View>
      <View
        style={
          orientation === 'PORTRAIT'
            ? {height: '80%', width: '100%'}
            : {height: '40%', width: '100%'}
        }>
        <ScrollView>
          {MessageData.map((v, i) => {
            return (
              <MessageContent navigation={navigation} v={v} i={i} key={i} />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default Message;
