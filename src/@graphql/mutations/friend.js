import {gql} from '@apollo/client';

export const followFriendMutation = gql`
  mutation followFriends($friendId: String!) {
    followFriends(friendId: $friendId) {
      success
      message
      debugMessage
    }
  }
`;

export const acceptFriendRequestMutation = gql`
  mutation acceptFriendRequest($friendId: String!, $RequestId: String!) {
    acceptFriendRequest(friendId: $friendId, RequestId: $RequestId) {
      success
      message
      debugMessage
    }
  }
`;

export const declineFriendRequestMutation = gql`
  mutation declineFriendRequest($RequestId: String!) {
    declineFriendRequest(RequestId: $RequestId) {
      success
      message
      debugMessage
    }
  }
`;

export const unFollowFriendMutation = gql`
  mutation unFollowFriend($id: String!) {
    unFollowFriend(id: $id) {
      success
      message
      debugMessage
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $userType: String
    $WorkoutTimeFrom: String
    $WorkoutTimeTo: String
    $DateOfBirth: String
    $ProfilePicture: Upload
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      WorkoutTimeFrom: $WorkoutTimeFrom
      WorkoutTimeTo: $WorkoutTimeTo
      DateOfBirth: $DateOfBirth
      ProfilePicture: $ProfilePicture
    ) {
      success
      message
      debugMessage
    }
  }
`;

export const CreateBioMutation = gql`
  mutation CreateBio($Text: String!) {
    CreateBio(Text: $Text) {
      success
      message
      debugMessage
    }
  }
`;
