import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import {withContext} from '../Context/appContext';

import PlusBtn from '../components/SVG/PlusBtn';
import PeopleBlackSvg from '../components/SVG/PeopleBlackSvg';
import PeopleSvg from '../components/SVG/peopleSvg';
import MessageSvg from '../components/SVG/messageSvg';
import NewsFeedSvg from '../components/SVG/NewsFeedSvg';
import NewsFeedBlackSvg from '../components/SVG/NewsFeedBlacksvg';
import MessageBlackSvg from '../components/SVG/MessageSvgBlack';
import AvatarPic from '../assets/avatar.jpg';

// NewsFeed
import NewsFeed from '../Pages/NewsFeed/index';
//Notification
import Notification from '../Pages/Notification/index';
//Messages
import Message from '../Pages/Messages/index';
//Friends Suggestion
import FriendSuggestion from '../Pages/Friends Suggestion/index';

import PostCreating from '../components/PostCreating';
import PostPosting from '../components/PostPosting';
import Profile from '../components/Profile';
import FriendsProfile from '../components/Friends/FriendsProfile';
import FindFriends from '../components/Friends/FindFriends';
import Dashboard from '../components/Dashboard';
import AcceptAndDecline from '../components/FriendSuggestionScreens/AcceptAndDecline';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../Pages/Edit Profile';
import UserInfo from '../Pages/User Info/index';

const Stack = createNativeStackNavigator();

const NewsFeedStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NewsFeed" component={NewsFeed} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};
const MessageStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
};
const PostCreatingStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PostCreating" component={PostCreating} />
      <Stack.Screen name="PostPosting" component={PostPosting} />
    </Stack.Navigator>
  );
};
const FriendSuggestionStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FriendSuggestion" component={FriendSuggestion} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AcceptAndDecline" component={AcceptAndDecline} />
      <Stack.Screen name="userInfo" component={UserInfo} />
    </Stack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FriendsProfile" component={FriendsProfile} />
      <Stack.Screen name="FindFriends" component={FindFriends} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({currentUser}) => {
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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:
          orientation === 'PORTRAIT' ? {height: '8%'} : {height: '16%'},
      }}
      initialRouteName="NewsFeed"
      tabBarOptions={{
        activeTintColor: '#dd9392',
        showLabel: false,
      }}>
      <Tab.Screen
        name="NewsFeed"
        component={NewsFeedStackScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabBackGroundDiv}>
                <NewsFeedSvg />
              </View>
            ) : (
              <NewsFeedBlackSvg />
            ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageStackScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabBackGroundDiv}>
                <MessageSvg />
              </View>
            ) : (
              <MessageBlackSvg />
            ),
        }}
      />
      <Tab.Screen
        name="PostCreating"
        component={PostCreatingStackScreen}
        options={{
          tabBarIcon: () => <PlusBtn />,
        }}
      />
      <Tab.Screen
        name="FriendSuggestion"
        component={FriendSuggestionStackScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.TabBackGroundDiv}>
                <PeopleSvg />
              </View>
            ) : (
              <PeopleBlackSvg />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({size}) => (
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
              style={{
                width: 35,
                height: 35,
                borderRadius: size,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default withContext(TabNavigation);

const styles = StyleSheet.create({
  TabBackGroundDiv: {
    width: 60,
    height: 31,
    borderRadius: 15,
    backgroundColor: 'rgba(221, 147, 146, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
