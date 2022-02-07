import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView, Text} from 'react-native';
import {withFriendContext} from '../../Context/FriendsContext';
import FriendsContent from './FriendsContent';
import NoData from '../NoData';
import ContactHeader from '../Headers/Contact';

const styles = StyleSheet.create({
  MainContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f9f9f9',
  },
});

const FriendsProfile = ({
  navigation,
  FriendFollowingData,
  FriendFollowersData,
}) => {
  const headerName = 'Friends List';

  return (
    <View style={styles.MainContainer}>
      <ContactHeader headerName={headerName} navigation={navigation} />
      <View style={{width: '100%', height: '82%', backgroundColor: '#f9f9f9'}}>
        <ScrollView>
          {FriendFollowersData?.Followers.legth >= 1 ? (
            FriendFollowersData?.Followers.map((value, index) => {
              return (
                <>
                  <FriendsContent
                    value={value.Followers}
                    index={index}
                    key={index}
                    FollowId={value.id}
                  />
                </>
              );
            })
          ) : (
            <NoData Content={'No Followers to Show'} />
          )}
          {FriendFollowingData?.Following.length >= 1 ? (
            FriendFollowingData?.Following.map((value, index) => {
              return (
                <>
                  <FriendsContent
                    value={value.Following}
                    index={index}
                    key={index}
                    FollowId={value.id}
                  />
                </>
              );
            })
          ) : (
            <NoData Content={'No One is Following You'} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default withFriendContext(FriendsProfile);
