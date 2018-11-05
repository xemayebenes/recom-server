import { gql } from 'apollo-server-express';

//eslint-disable-next-line
export const Notification = gql`
  type Notification {
    id: ID!
    new: Boolean
    date: Date
    type: String
    externalId: Int
    title: String
    from: User
    listId: String
  }
`;
