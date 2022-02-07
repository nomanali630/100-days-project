import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {
  acceptFriendRequestMutation,
  declineFriendRequestMutation,
} from '../../@graphql/mutations/friend';
import {showMessage} from 'react-native-flash-message';
import {withFriendContext} from '../../Context/FriendsContext';
import ContactHeader from '../Headers/Contact';
import FriendSuggestionHorizontal from './FriendSuggestionHorizontal';
import SelectScreen from '../SelectScreen';
import NoData from '../NoData';

const styles = StyleSheet.create({
  frndSuggestText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 18,
    color: '#030303',
    opacity: 0.4,
    paddingLeft: 10,
  },
  suggestionContainer: {
    flexDirection: 'row',
  },
});
//Getting data of Request from Friends in context Api
const AcceptAndDecline = ({
  navigation,
  RequestRecievedData,
  refetchReqUser,
  refetchFriendFollowers,
  refetchFriendFollowing,
}) => {
  const headerName = 'Friends';

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

  const [AcceptFriendReq] = useMutation(acceptFriendRequestMutation, {
    onCompleted: res => {
      console.log(res);
      showMessage({
        message: res.acceptFriendRequest.message,
        type: res.acceptFriendRequest.success ? 'success' : 'danger',
      });
      if (res.acceptFriendRequest.success) {
        refetchReqUser();
        refetchFriendFollowing();
        refetchFriendFollowers();
      }
    },
    onError: res => {
      console.log(res);
      showMessage({
        message: res.toString(),
        type: 'danger',
      });
    },
  });
  const handleReqAccepted = ({RequestId, friendId}) => {
    AcceptFriendReq({
      variables: {
        RequestId,
        friendId,
      },
    });
  };
  const [DeclineFriendReq] = useMutation(declineFriendRequestMutation, {
    onCompleted: res => {
      console.log(res);
      showMessage({
        message: res.declineFriendRequest.message,
        type: res.declineFriendRequest.success ? 'success' : 'danger',
      });
      if (res.declineFriendRequest.success) {
        refetchReqUser();
        refetchFriendFollowing();
        refetchFriendFollowers();
      }
    },
    onError: res => {
      console.log(res);
      showMessage({
        message: res.toString(),
        type: 'danger',
      });
    },
  });
  const handleReqDecline = ({RequestId}) => {
    DeclineFriendReq({
      variables: {
        RequestId,
      },
    });
  };

  return (
    <View
      style={
        orientation === 'PORTRAIT'
          ? {
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#f9f9f9',
            }
          : {
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#f9f9f9',
            }
      }>
      <ContactHeader navigation={navigation} headerName={headerName} />

      <View
        style={orientation === 'PORTRAIT' ? {height: '82%'} : {height: '82%'}}>
        <ScrollView
          contentContainerStyle={
            orientation === 'PORTRAIT' ? {width: '100%', height: '100%'} : null
          }>
          <SelectScreen navigation={navigation} />

          <View
            style={
              orientation === 'PORTRAIT'
                ? {height: '8%', justifyContent: 'center'}
                : null
            }>
            <Text style={styles.frndSuggestText}>accept and decline</Text>
          </View>
          <View
            style={{
              ...styles.suggestionContainer,
              width: screenWidth,
              height: '30%',
            }}>
            <ScrollView horizontal={true}>
              {RequestRecievedData?.RequestReceived.length >= 1 ? (
                RequestRecievedData?.RequestReceived.map((v, i) => {
                  return (
                    <FriendSuggestionHorizontal
                      v={v.RequestBy}
                      RequestId={v.id}
                      key={i}
                      i={i}
                      handleReqAccepted={handleReqAccepted}
                      handleReqDecline={handleReqDecline}
                    />
                  );
                })
              ) : (
                <NoData Content={'No Request Recived'} />
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default withFriendContext(AcceptAndDecline);
