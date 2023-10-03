import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const genId = () => Math.random().toString(32).substring(2);

const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    getTodoList: [Todo!]!
    getTodo(id: ID!): Todo!
  }

  type Mutation {
    addTodo(title: String!): Todo!
  }
`;

let todoList = {
  [genId()]: {
    title: "GraphQLの本を読む",
    done: false,
  },
  [genId()]: {
    title: "GraphQLの本を読む",
    done: false,
  },
  [genId()]: {
    title: "GraphQLの本を読む",
    done: false,
  },
} as Record<
  string,
  {
    title: string;
    done: boolean;
  }
>;

const resolvers = {
  Query: {
    getTodoList: () => {
      const todoArray = Object.entries(todoList).map(([id, todo]) => ({
        id,
        ...todo,
      }));

      return todoArray;
    },
    getTodo: (parent: any, args: { id: string }) => {
      const { id } = args;
      const todo = todoList[id];
      return todo;
    },
  },
  Mutation: {
    addTodo: (parent: any, args: { title: string }) => {
      const { title } = args;
      const id = genId();
      todoList = {
        ...todoList,
        [id]: {
          title,
          done: false,
        },
      };
      return {
        id,
        title,
        done: false,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
