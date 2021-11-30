import { gql } from "@apollo/client";

export const QUERY_ART = gql`
  query allArt {
    art {
      _id
      title
      cloudURL
      publishDate
    }
  }
`;

export const QUERY_SINGLE_ART = gql`
  query oneArt($artId: ID!) {
    singleArt(artId: $artId) {
      _id
      title
      cloudURL
      publishDate
    }
  }
`;

export const QUERY_GENRE = gql`
  query allGenre($genre: String!) {
    artGenre(genre: $genre) {
      _id
      title
      cloudURL
      genre
      publishDate
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


