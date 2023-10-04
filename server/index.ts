import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { genId } from "./utils";
import { readFileSync } from 'fs'
import path from 'path'

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

type TodoFilter = {
  title?: string;
  done?: boolean;
};

const schemaPath = path.resolve(__dirname, './schema.graphql')

const typeDefs = readFileSync(schemaPath, {
  encoding: 'utf8'
})

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
    title: "TypeScriptの本を読む",
    done: false,
    labelIds: [labels[0].id, labels[1].id],
  },
  {
    id: genId(),
    title: "お散歩する",
    done: true,
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
    todos: () => {
      return todoList;
      // return todoList.map((todo) => {
      //   const label = findLabelList(todo);
      //   return {
      //     ...todo,
      //     labels: label,
      //   };
      // });
    },
    getTodo: (parent: any, args: { id: string }) => {
      const { id } = args;
      const todo = todoList.find((todo) => todo.id === id);
      if (!todo) throw new Error("Todo not found");
      return todo;
    },
    getFilterdTodoList: (parent: any, args: { filter: TodoFilter }) => {
      const { filter } = args;
      return todoList
        .filter((todo) => {
          if (filter.title !== undefined && !todo.title.includes(filter.title))
            return false;
          if (filter.done !== undefined && filter.done !== todo.done)
            return false;
          return true;
        })
        .map((todo) => {
          const label = findLabelList(todo);
          return {
            ...todo,
            labels: label ?? [],
          };
        });
    },
  },
  Todo: {
    labels: (parent: Todo) => {
      return findLabelList(parent);
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
