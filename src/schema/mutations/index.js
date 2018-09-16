export default `
  type Mutation {
    addMovie(externalId: Int!): UserMovie
    addSerie(externalId: Int!): UserSerie
    removeMovie(id: String!): String
    removeSerie(id: String!): String
    completeMovie(id: String!): UserMovie
    completeSerie(id: String!): UserSerie
    pushNotification(type: String!,title: String, externalId:Int, userEmail: String!): Notification
    markNotification(id: String!): Notification
    createList(name: String!,type: String!, description: String, items: [String]): List
    removeList(listId: String!): String
    addItemToList(listId: String!, itemId: String!): List
    removeItemFromList(listId: String!, itemId: String!): List
    importList(listId:String!, userId:String!): List
  }
`;
