import React, {createContext, useEffect, useReducer, useState} from 'react';
import {useQuery} from '@apollo/client';
import {
  FollowingFriends,
  FriendsFollowers,
  FriendSuggestion,
  RequestRecieved,
} from '../@graphql/Query/friendsQuery';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withContext} from './appContext';

export const Context = createContext();
export const withFriendContext = Component => props =>
  (
    <Context.Consumer>
      {value => <Component {...value} {...props} />}
    </Context.Consumer>
  );

// Getting friend's followers and following
const FriendContextProvider = ({
  children,
  UserHasSubscribed,
  currentUser,
  refetchUserSubscribed,
  setToken,
}) => {
  const navigation = useNavigation();
  // AsyncStorage.removeItem('Token');
  // useEffect(() => {
  //   AsyncStorage.getItem('Token').then(res => {
  //     if (res) {
  //       setToken(res);
  //       if (UserHasSubscribed?.hasUserSubscribed?.success == false) {
  //         navigation.navigate('SelectSubscription');
  //       } else if (UserHasSubscribed?.hasUserSubscribed?.success) {
  //         if (currentUser?.loggedInUser?.Goal.length >= 1) {
  //           navigation.navigate('Home');
  //         } else {
  //           navigation.navigate('SelectGoal');
  //         }
  //       } else if (
  //         UserHasSubscribed?.hasUserSubscribed?.success &&
  //         currentUser?.loggedInUser?.Goal.length >= 1
  //       ) {
  //         navigation.navigate('Home');
  //       } else if (!UserHasSubscribed) {
  //         refetchUserSubscribed();
  //       }
  //     } else {
  //       setToken(null);
  //     }
  //   });
  // });

  const [UserInfoId, setUserInfoId] = useState('');
  const {
    loading: SuggestedFriendsAreLoading,
    error: SuggestedFriendsError,
    data: FriendSuggestionData,
    refetch: refetchFriendSuggestion,
  } = useQuery(FriendSuggestion);

  const {
    loading: RequestIsLoading,
    error: RequestHasError,
    data: RequestRecievedData,
    refetch: refetchReqUser,
  } = useQuery(RequestRecieved);

  const {
    loading: FollowingLoad,
    error: FollowingError,
    data: FriendFollowingData,
    refetch: refetchFriendFollowing,
  } = useQuery(FollowingFriends);
  const {
    loading: FollowersLoad,
    error: FollowersError,
    data: FriendFollowersData,
    refetch: refetchFriendFollowers,
  } = useQuery(FriendsFollowers);

  useEffect(() => {
    if (!FriendSuggestionData) {
      refetchFriendSuggestion();
    } else if (!RequestRecievedData) {
      refetchReqUser();
    } else if (!FriendFollowingData) {
      refetchFriendFollowing();
    } else if (!FriendFollowersData) {
      refetchFriendFollowers();
    }
  }, []);

  function GetUserInfo(id) {
    if (id) {
      setUserInfoId(id);
      navigation.navigate('userInfo');
    }
  }
  return (
    <Context.Provider
      value={{
        FriendFollowersData,
        FriendFollowingData,
        FriendSuggestionData,
        RequestRecievedData,
        refetchReqUser,
        refetchFriendFollowing,
        refetchFriendFollowers,
        UserInfoId,
        GetUserInfo,
      }}>
      {children}
    </Context.Provider>
  );
};
export default withContext(FriendContextProvider);
