import React, {useState, useEffect} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import profilePic from '../../assets/profilePic.png';
import postPic from '../../assets/postPic.png';
import NewsFeedContent from '../../components/Post';
import NewsFeedHeader from '../../components/Headers/NewsFeed';
import CommenterDP from '../../assets/commenterDP.png';
import {withContext} from '../../Context/appContext';

const POST_DATA = [
  {
    profilePicture: profilePic,
    ProfileName: 'Fernandez Ramos',
    PostText:
      'lorem is my brother how are u doing my brother fitnees model fitness freak',
    PostPicture: postPic,
    ReactionNumber: '30',
    ReactionText: 'Reactions',
    CommentsNumber: '5',
    CommentsText: 'Comments',
    SomeOneReacted: 'Mao Lop 50 reacted',
    CommenterDP: CommenterDP,
    CommentName: 'Micheal Bruno',
    CommentText:
      'lorem ispum having water what about the matter is having the fire',
  },
  {
    profilePicture: profilePic,
    ProfileName: 'Fernandez Ramos',
    PostText:
      'lorem is my brother how are u doing my brother fitnees model fitness freak',
    PostPicture: postPic,
    ReactionNumber: '30',
    ReactionText: 'Reactions',
    CommentsNumber: '5',
    CommentsText: 'Comments',
    SomeOneReacted: 'Mao Lop 50 reacted',
    CommenterDP: CommenterDP,
    CommentName: 'Micheal Bruno',
    CommentText:
      'lorem ispum having water what about the matter is having the fire',
  },
  {
    profilePicture: profilePic,
    ProfileName: 'Fernandez Ramos',
    PostText:
      'lorem is my brother how are u doing my brother fitnees model fitness freak',
    PostPicture: postPic,
    ReactionNumber: '30',
    ReactionText: 'Reactions',
    CommentsNumber: '5',
    CommentsText: 'Comments',
    SomeOneReacted: 'Mao Lop 50 reacted',
    CommenterDP: CommenterDP,
    CommentName: 'Micheal Bruno',
    CommentText:
      'lorem ispum having water what about the matter is having the fire',
  },
];

const NewsFeed = ({navigation}) => {
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
      style={{
        height: screenHeight,
        backgroundColor: '#f9f9f9',
        width: screenWidth,
      }}>
      <NewsFeedHeader navigation={navigation} />

      <View
        style={
          orientation === 'PORTRAIT'
            ? {width: '100%', height: '82%'}
            : {width: '100%', height: '60%'}
        }>
        <ScrollView>
          {POST_DATA.map((v, i) => {
            return <NewsFeedContent v={v} i={i} key={i} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default withContext(NewsFeed);
