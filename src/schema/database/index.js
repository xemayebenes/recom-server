export const UserMovie = `
  type UserMovie {
    id: ID!
    completed: Boolean
    externalId: Int
    film: Movie
  }
`;

export const UserSerie = `
type UserSerie {
  id: ID!
  completed: Boolean
  externalId: Int
  serie: Serie
}
`;
export const LastItem = `
type LastItem {
  id: ID!
  date: Date
  type: String
  item: ItemInterface
}
`;

export const Date = `
  scalar Date
`;

export const User = `
type User {
  id: ID!
  email: String
}
`;
