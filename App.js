import React, {useEffect} from 'react';

import FlashMessage from 'react-native-flash-message';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';

// Context
import ContextProvider from './src/Context/appContext';

import Navigator from './src/Navigator/index';

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('Token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: 'https://ia100days.herokuapp.com/graphql',
      // uri: "http://192.168.1.117:5100/graphql",
    }),
  ),
  cache: new InMemoryCache(),
});

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <Navigator />
        <FlashMessage position="top" />
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
