import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import CommentIcon from '../assets/commentIcon.png';
import reacts from '../assets/reactionImage.png';

const styles = StyleSheet.create({
  newsFeedSection: {
    width: '100%',
  },
  profileDiv: {
    width: '100%',
    height: '10%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ellipseDiv: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#e0a6a7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  profileName: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 18,
    fontWeight: '300',
    color: '#19295c',
    marginLeft: 15,
  },
  postTextDiv: {
    width: '100%',
    height: '10%',
    paddingLeft: 10,
  },
  postText: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 15,
    fontWeight: '300',
    color: '#444d6e',
    lineHeight: 20,
  },
  postPicDiv: {
    width: '100%',
    height: '50%',
    // backgroundColor:'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postPic: {
    width: '100%',
    height: '100%',
    // height: 203,
    borderRadius: 14,
    marginTop: 5,
  },
  reactionShowingDiv: {
    flexDirection: 'row',
    // height:'10%',
    marginLeft: 8,
  },
  reactionBtnMainDiv: {
    width: '100%',
    height: '10%',
    // backgroundColor: 'grey',
    flexDirection: 'row',
  },
  buttonsDiv: {
    // backgroundColor: 'pink',
    width: '50%',
    height: 34,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginLeft: 20,
    // marginTop: 5
  },
  reactionsDiv: {
    // backgroundColor: 'green',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 3,
    justifyContent: 'space-between',
  },
  otherComment: {
    width: 280,
    height: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    // marginRight: 65,
    // marginTop: 5,
  },
  commenterDp: {
    width: 28,
    height: 28,
    // marginRight: 10,
    // marginTop: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
  },
  commntName: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 15,
    fontWeight: '300',
    color: '#1b1b1b',
  },
  NewsFeedContentMainDiv: {
    width: '100%',
    height: 500,
    // backgroundColor: 'grey',
    backgroundColor: '#fff',
    borderRadius: 24,
    marginTop: 18,
    // justifyContent:'center',
    alignItems: 'center',
    padding: 15,
  },
  reactedText: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 12,
    fontWeight: '300',
    color: '#747ea0',
  },
});

const NewsFeedContent = ({v, i}) => {
  return (
    <View key={i} style={styles.NewsFeedContentMainDiv}>
      <View style={styles.profileDiv}>
        <View style={styles.ellipseDiv}>
          <Image source={v.profilePicture} style={styles.profilePic} />
        </View>
        <Text style={styles.profileName}>{v.ProfileName}</Text>
      </View>
      <View style={styles.postTextDiv}>
        <Text style={styles.postText}>{v.PostText}</Text>
      </View>
      <View style={styles.postPicDiv}>
        <Image source={v.PostPicture} style={styles.postPic} />
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={styles.reactionShowingDiv}>
          <Text style={{marginRight: 5}}>{v.ReactionNumber}</Text>
          <Text>{v.ReactionText}</Text>
        </View>
        <View style={styles.reactionShowingDiv}>
          <Text style={{marginRight: 5}}>{v.CommentsNumber}</Text>
          <Text>{v.CommentsText}</Text>
        </View>
      </View>
      <View style={styles.reactionBtnMainDiv}>
        <View style={styles.buttonsDiv}>
          <Text>
            <Icon name="like1" color="#3b5998" size={17} />
          </Text>
          <Text>
            <Image source={CommentIcon} />
          </Text>
          <Text>
            <ShareIcon name="share" color="#3b5998" size={17} />
          </Text>
        </View>
        <View style={styles.reactionsDiv}>
          <View>
            <Text style={styles.reactedText}>Mao Lop 50 reacted</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={reacts} />
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '15%',
          //   backgroundColor: 'pink',
        }}>
        <View style={styles.otherComment}>
          <View style={{width: '13%'}}>
            <Image source={v.CommenterDP} style={styles.commenterDp} />
          </View>
          <View style={{width: '85%'}}>
            <Text style={styles.commntName}>{v.CommentName}</Text>
            <Text
              style={{
                fontSize: 12,
                color: '#7a8fa6',
                fontFamily: 'Canaro-LightDEMO',
                fontWeight: '300',
                height: 35,
              }}>
              {v.CommentText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsFeedContent;
