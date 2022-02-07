import {gql} from '@apollo/client';

export const getAllGoals = gql`
  query {
    Goal {
      Goal
      Image {
        filename
      }
    }
  }
`;

export const getAllSubsPackages = gql`
  query {
    AvailableSubscriptions {
      id
      PackageName
      PackageTimePeriod
      Charges
    }
  }
`;

export const loggedInUser = gql`
  query {
    loggedInUser {
      id
      userType
      firstName
      lastName
      email
      password
      DateOfBirth
      SubscriptionPackage {
        id
        Package {
          PackageName
          PackageTimePeriod
        }
      }
      Goal {
        id
        goalId
        userId
        Goal {
          Goal
          id
        }
      }
      Bio {
        Text
      }
      ProfilePicture {
        filename
        mimetype
        encoding
      }
      CurrentDay
      Tier {
        id
        Tier {
          Level
          color
        }
      }
      WorkoutTimeFrom
      WorkoutTimeTo
      createdAt
      updatedAt
    }
  }
`;
export const hasUserSubscribed = gql`
  query {
    hasUserSubscribed {
      success
      message
      debugMessage
    }
  }
`;
