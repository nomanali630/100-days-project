import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AvatarPic from '../../assets/avatar.jpg';
import {withFriendContext} from '../../Context/FriendsContext';

const styles = StyleSheet.create({
  frndSuggestionMainDiv: {
    width: 171,
    height: 165,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginRight: 16,
  },
  ellipseDiv: {
    width: 52,
    height: 53,
    borderWidth: 2,
    borderColor: '#e0a6a7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  profilePic: {
    width: 47,
    height: 47,
    borderRadius: 100,
  },
  buttonContainer: {
    backgroundColor: '#efa4a3',
    width: 118,
    height: 28,
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 8,
  },
  button: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
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

const FriendSuggestionHorizontal = ({
  v,
  i,
  RequestId,
  handleReqAccepted,
  handleReqDecline,
  GetUserInfo,
}) => {
  return (
    <TouchableOpacity onPress={() => GetUserInfo(v.id)}>
      <View style={styles.frndSuggestionMainDiv} key={i}>
        <View style={styles.ellipseDiv}>
          <Image
            source={
              v.ProfilePicture && v.ProfilePicture.length >= 1
                ? {
                    uri: v.ProfilePicture[v.ProfilePicture.length - 1].filename,
                  }
                : AvatarPic
            }
            style={styles.profilePic}
          />
        </View>
        <View>
          <Text style={styles.blairTxt}>{v.firstName}</Text>
        </View>
        <View>
          <Text style={styles.refernceTxt}>Reference Site</Text>
        </View>
        {RequestId ? (
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleReqAccepted({RequestId, friendId: v.id})}>
              <Text style={styles.button}>Accept req</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleReqDecline({RequestId})}>
              <Text style={styles.button}>Reject req</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.button}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default withFriendContext(FriendSuggestionHorizontal);
