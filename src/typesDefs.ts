// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    type Event {
        UUID: String,
        username: String,
        title: String,
        date_time: String,
        data: String,
    }

    input EventInput {
        username: String,
        title: String,
        date_time: String,
        data: String,
    }

    input EventUpdate {
        UUID: String,
        username: String,
        title: String,
        date_time: String,
        data: String,
    }

    input User {
        username: String,
        password: String,
    }

  # This "Book" type defines the queryable fields for every book in our data source.

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
      GetEventById(UUID: String): Event
      GetEvents: [Event]
      VerifyUser(user: User): Boolean
  }

  type Mutation {
      AddEvent(entry: EventInput): Boolean
      UpdateEvent(entry: EventUpdate): Boolean
      DeleteEvent(UUID: String): Boolean
      AddUser(user: User): Boolean
      DeleteUser(user: User): Boolean
  }
`;
