import React, {createContext, useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {
  getAllSubsPackages,
  hasUserSubscribed,
  loggedInUser,
} from '../@graphql/Query/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {DummycurrentUser} from './constant';

export const Context = createContext();
export const withContext = Component => props =>
  (
    <Context.Consumer>
      {value => <Component {...value} {...props} />}
    </Context.Consumer>
  );
//Getting data from GraphQL and sending it the Context Api
const ContextProvider = ({children}) => {
  const {
    loading: loadingAllSubsPackages,
    error: ErrorLoadingAllPackages,
    data: AllAvailableSubscriptions,
    refetch: refetchAllAvailableSubscriptions,
  } = useQuery(getAllSubsPackages);

  useEffect(() => {
    if (!AllAvailableSubscriptions) {
      refetchAllAvailableSubscriptions();
    }
  }, []);
  const {
    loading: currentUserIsLoading,
    error: currentUserHasError,
    data: LogincurrentUser,
    refetch: refetchCurrentUser,
  } = useQuery(loggedInUser);

  // const currentUser = DummycurrentUser;
  // AsyncStorage.setItem(
  //   'Token',
  //   '3291390127489123741278490128490128490128',
  // ).then(() => {});

  const {
    loading: SubscribeLoading,
    error: subscribedError,
    data: UserHasSubscribed,
    refetch: refetchUserSubscribed,
  } = useQuery(hasUserSubscribed);
  const [token, setToken] = useState(null);
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    setcurrentUser({});
    if (!currentUserIsLoading) {
      setcurrentUser(LogincurrentUser);
    }
  }, [LogincurrentUser, currentUserIsLoading]);
  useEffect(() => {
    AsyncStorage.getItem('Token').then(res => {
      setToken(res);
    });
    if (!token) {
    } else if (token && !currentUser) {
      refetchCurrentUser();
    }
  }, []);
  console.log('context wala current user', currentUser);
  return (
    <Context.Provider
      value={{
        currentUser,
        refetchCurrentUser,
        UserHasSubscribed,
        refetchUserSubscribed,
        token,
        setToken,
        AllAvailableSubscriptions,
      }}>
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
