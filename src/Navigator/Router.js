import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FriendContextProvider from '../Context/FriendsContext';

// Pages

// Auth
import GetStarted from '../Pages/GetStarted/index';
import Login from '../Pages/Login/index';
import SignUp from '../Pages/Signup/index';
import ForgotPassword from '../Pages/Forgot Password/index';
import ResetForgotPassword from '../Pages/Forgot Password/reset';

// Goal
import SelectGoal from '../Pages/Select Goal/index';
// Subscription
import SelectSubscription from '../Pages/Select Subscription/index';
// ResetPassword
import ResetPassword from '../Pages/Reset Password/index';
// Congratulations
import Congratulations from '../Pages/Congratulations';

import TabNavigation from './Tabs';

const Stack = createNativeStackNavigator();

export const Tabs = () => {
  return (
    <NavigationContainer>
      <FriendContextProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={TabNavigation} />
          <Stack.Screen name="Congratulations" component={Congratulations} />
          <Stack.Screen name="SelectGoal" component={SelectGoal} />
          {/* <Stack.Screen
            name="SelectSubscription"
            component={SelectSubscription}
          /> */}
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </FriendContextProvider>
    </NavigationContainer>
  );
};
export const SubscriptionTabs = () => {
  return (
    <NavigationContainer>
      <FriendContextProvider>
        <Stack.Navigator
          initialRouteName="SelectSubscription"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="SelectSubscription"
            component={SelectSubscription}
          />
        </Stack.Navigator>
      </FriendContextProvider>
    </NavigationContainer>
  );
};
export const SelectGoalTabs = () => {
  return (
    <NavigationContainer>
      <FriendContextProvider>
        <Stack.Navigator
          initialRouteName="SelectGoal"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SelectGoal" component={SelectGoal} />
        </Stack.Navigator>
      </FriendContextProvider>
    </NavigationContainer>
  );
};
export const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="SelectGoal" component={SelectGoal} />
        <Stack.Screen
          name="SelectSubscription"
          component={SelectSubscription}
        /> */}
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="ResetForgotPassword"
          component={ResetForgotPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
