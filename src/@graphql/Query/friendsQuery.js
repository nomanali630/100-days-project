import {gql} from '@apollo/client';

export const FriendSuggestion = gql`
  query {
    FriendSuggestion {
      id
      userType
      firstName
      lastName
      email
      ProfilePicture {
        id
        filename
      }
    }
  }
`;
export const FollowingFriends = gql`
  query {
    Following {
      id
      Following {
        id
        firstName
        lastName
        email
        ProfilePicture {
          filename
        }
      }
      userId
      isAccepted
    }
  }
`;
export const FriendsFollowers = gql`
  query {
    Followers {
      id
      Followers {
        id
        firstName
        lastName
        email
        ProfilePicture {
          filename
        }
      }
      friendId
      isAccepted
    }
  }
`;
export const RequestRecieved = gql`
  query {
    RequestReceived {
      id
      RequestBy {
        id
        firstName
        lastName
        email
        ProfilePicture {
          filename
          mimetype
          encoding
        }
      }

      userId
      RequestTo {
        id
        firstName
        lastName
        email
      }
      friendId
    }
  }
`;
export const userInfo = gql`
  query UserInfo($id: String!) {
    UserInfo(id: $id) {
      id
      userType
      firstName
      lastName
      email
      ProfilePicture {
        filename
        mimetype
        encoding
      }
      Bio {
        Text
      }
    }
  }
`;
