const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
  }

  type Art {
    _id: ID
    title: String!
    cloudURL: String!
    genre: String!
    publishDate: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   art: [Art]!
   singleArt(artId: ID!): Art
   msPaint(genre: String!): [Art]
   users: [User]
   user(_id: ID!): User
   me: User
  }

  type Mutation {
    addArt(title: String!, cloudURL: String!, genre: String!): Art
    # addUser(name: String!, email: String!, password: String!, level: Int): Auth
    login(email: String!, password: String!): Auth
    removeArt(artId: ID!): Art
  }
`;

module.exports = typeDefs;
