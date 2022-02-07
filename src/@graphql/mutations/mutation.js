import {gql} from '@apollo/client';

//

export const signUpMutation = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $DateOfBirth: String
    $ProfilePicture: Upload
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      DateOfBirth: $DateOfBirth
      ProfilePicture: $ProfilePicture
    ) {
      token
    }
  }
`;

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export const subscribeSubriptionMutation = gql`
  mutation subscribeSubscription($PackageName: String!, $BankName: String!) {
    subscribeSubscription(PackageName: $PackageName, BankName: $BankName) {
      message
      success
    }
  }
`;
export const SelectedGoal = gql`
  mutation selectGoal($Goal: String!) {
    selectGoal(Goal: $Goal) {
      message
      success
    }
  }
`;
export const Reset_Password = gql`
  mutation resetPassword($oldPassword: String!, $newPassword: String!) {
    resetPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
      message
      debugMessage
    }
  }
`;
export const Forgot_Password = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
      debugMessage
    }
  }
`;
export const Reset_Forgot_Password = gql`
  mutation resetForgotPassword($token: String!, $newPassword: String!) {
    resetForgotPassword(token: $token, newPassword: $newPassword) {
      success
      message
      debugMessage
    }
  }
`;
