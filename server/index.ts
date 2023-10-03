import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { genId } from "./utils";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  labelIds?: string[];
};

type Label = {
  id: string;
  name: string;
};

const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    labels: [Label]!
  }

  type Label {
    id: ID!
    name: String!
  }

  type Query {
    getTodoList: [Todo!]!
    getTodo(id: ID!): Todo!
  }

  type Mutation {
    addTodo(title: String!): Todo!
  }
`;

let labels = [
  {
    id: genId(),
    name: "GraphQL",
  },
  {
    id: genId(),
    name: "TypeScript",
  },
];

let todoList = [
  {
    id: genId(),
    title: "GraphQLの本を読む",
    done: false,
    labelIds: [labels[0].id],
  },
  {
    id: genId(),
    title: "GraphQLの本を読む",
    done: false,
    labelIds: [labels[0].id, labels[1].id],
  },
  {
    id: genId(),
    title: "GraphQLの本を読む",
    done: false,
  },
];

const findLabelList = (todo: Todo): Label[] => {
  return (
    todo.labelIds
      ?.map((labelId) => {
        const res = labels.find((label) => label.id === labelId);
        return res;
      })
      .filter((label): label is Label => !!label) ?? []
  );
};

const resolvers = {
  Query: {
    getTodoList: () => {
      return todoList.map((todo) => {
        const label = findLabelList(todo);
        return {
          ...todo,
          labels: label,
        };
      });
    },
    getTodo: (parent: any, args: { id: string }) => {
      const { id } = args;
      const todo = todoList.find((todo) => todo.id === id);
      if (!todo) throw new Error("Todo not found");
      return {
        ...todo,
        labels: findLabelList(todo),
      };
    },
  },
  Mutation: {
    addTodo: (parent: any, args: { title: string }) => {
      const newTodo = {
        id: genId(),
        title: args.title,
        done: false,
        labelIds: [],
      };
      todoList.push(newTodo);

      return newTodo;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
