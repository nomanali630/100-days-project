import React, {useEffect, useState} from 'react';
import {withContext} from '../Context/appContext';
import {Auth, SelectGoalTabs, SubscriptionTabs, Tabs} from './Router';

const Navigator = ({token, currentUser, refetchCurrentUser}) => {
  const [UpdateSubscription, setUpdateSubscription] = useState(false);
  const [UpdateGoal, setUpdateGoal] = useState(false);

  useEffect(() => {
    refetchCurrentUser();
  }, []);
  useEffect(() => {
    setUpdateSubscription(!UpdateSubscription);
  }, [
    currentUser,
    currentUser?.loggedInUser,
    currentUser?.loggedInUser?.SubscriptionPackage,
  ]);

  useEffect(() => {
    setUpdateGoal(!UpdateGoal);
  }, [currentUser, currentUser?.loggedInUser, currentUser?.loggedInUser?.Goal]);
  return (
    <>
      {token ? (
        currentUser &&
        currentUser?.loggedInUser?.SubscriptionPackage &&
        currentUser?.loggedInUser?.SubscriptionPackage?.length ? (
          currentUser?.loggedInUser?.Goal?.length ? (
            <Tabs />
          ) : (
            <SelectGoalTabs />
          )
        ) : (
          <SubscriptionTabs />
        )
      ) : (
        <Auth />
      )}
    </>
  );
};

export default withContext(Navigator);
