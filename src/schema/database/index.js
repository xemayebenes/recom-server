export const UserMovie = `
  type UserMovie {
    id: ID!
    externalId: Int
    film: Movie
  }
`;

export const UserSerie = `
type UserSerie {
  id: ID!
  externalId: Int
  serie: Serie
}
`;
export const LastItem = `
type LastItem {
  id: ID!
  date: Date
  kind: String
  item: ItemInterface 
}
`;

export const Date = `
  scalar Date
`;