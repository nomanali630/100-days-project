import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {followFriendMutation} from '../../@graphql/mutations/friend';
import AvatarPic from '../../assets/avatar.jpg';
import {showMessage} from 'react-native-flash-message';
import {useMutation} from '@apollo/client';
import {withFriendContext} from '../../Context/FriendsContext';

const styles = StyleSheet.create({
  frndzCOntentDiv: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 79,
    marginBottom: 5,
    paddingLeft: 13,
    paddingRight: 13,
  },
  FollowbuttonContainer: {
    width: 118,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#efa4a3',

    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fff',
  },
  ellipseDiv2: {
    width: 52,
    height: 53,
    borderWidth: 2,
    borderColor: '#e0a6a7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 47,
    height: 47,
    borderRadius: 100,
  },
  blairTxt: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 18,
    color: '#030303',
  },
  refernceTxt: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 14,
    color: '#63697b',
    lineHeight: 17,
  },
});

const FriendSuggestionvartical = ({
  SuggestionData,
  i,
  refetchReqUser,
  refetchFriendFollowing,
  refetchFriendFollowers,
  refetchFriendSuggestion,
  GetUserInfo,
}) => {
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

  const [FollowFriend] = useMutation(followFriendMutation, {
    onCompleted: res => {
      console.log(res.followFriends.message);
      showMessage({
        message: res.followFriends.message,
        type: res.followFriends.success ? 'success' : 'danger',
      });
      if (res.followFriends.success) {
        refetchFriendSuggestion();
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

  const followFriendHandle = id => {
    FollowFriend({
      variables: {
        friendId: id,
      },
    });
  };

  return (
    <TouchableOpacity onPress={() => GetUserInfo(SuggestionData.id)}>
      <View style={{...styles.frndzCOntentDiv, width: screenWidth}} key={i}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.ellipseDiv2}>
            <Image
              source={
                SuggestionData.ProfilePicture &&
                SuggestionData.ProfilePicture.length
                  ? {
                      uri: SuggestionData.ProfilePicture[
                        SuggestionData.ProfilePicture.length - 1
                      ].filename,
                    }
                  : AvatarPic
              }
              style={styles.profilePic}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text style={styles.blairTxt}>{SuggestionData.firstName}</Text>
            <Text style={styles.refernceTxt}>Reference site</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.FollowbuttonContainer}
            onPress={() => {
              followFriendHandle(SuggestionData.id);
            }}>
            <Text style={styles.button2}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default withFriendContext(FriendSuggestionvartical);
