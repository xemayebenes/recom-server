//eslint-disable-next-line
export const Notification = `
    type Notification {
        id: ID!
        new: Boolean
        date: Date
        type: String
        externalId: Int
        title: String
        from: User
    }
`;
