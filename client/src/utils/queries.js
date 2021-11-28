import { gql } from "@apollo/client";

export const QUERY_ART = gql`
  query allArt {
    art {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
      videoAuthor
    }
  }
`;

export const QUERY_SINGLE_ART = gql`
  query singleArt($videoId: ID!) {
    singleArt(videoId: $videoId) {
      _id
      title
      cloudURL
      likes
      dislikes
      views
      publishDate
      likedBy
      dislikedBy
    }
  }
`;


export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(_id: $id) {
      name
      email
    }
  }
`;


