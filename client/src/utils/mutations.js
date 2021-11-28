import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_ART = gql`
  mutation addArt($title: String!, $cloudURL: String!) {
    addArt(title: $title, cloudURL: $cloudURL) {
      _id
      title
      cloudURL
      publishDate
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        level
      }
    }
  }
`;



export const REMOVE_VIDEO = gql`
  mutation removeArt($artId: ID!) {
    removeArt(artId: $artId) {
      _id
      title
      cloudURL
      publishDate
    }
  }
`

export default ADD_VIDEO;




