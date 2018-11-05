import { gql } from 'apollo-server-express';

export const UserMovie = gql`
  type UserMovie {
    id: ID!
    completed: Boolean
    externalId: Int
    film: Movie
  }
`;

export const UserSerie = gql`
  type UserSerie {
    id: ID!
    completed: Boolean
    externalId: Int
    serie: Serie
  }
`;
export const LastItem = gql`
  type LastItem {
    id: ID!
    date: Date
    type: String
    item: ItemInterface
  }
`;

export const Date = gql`
  scalar Date
`;

export const User = gql`
  type User {
    id: ID!
    email: String
  }
`;

export const List = gql`
  type List {
    id: ID!
    name: String
    description: String
    date: Date
    type: String
    items: [ItemInterface]
    user: User
  }
`;
