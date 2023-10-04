import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { genId } from "./utils";
import { readFileSync } from "fs";
import * as R from "remeda";
import path from "path";

const sampleTaskTitle = [
  "ミルクを買う",
  "猫の餌を注文する",
  "医者の予約を取る",
  "宿題を提出する",
  "洗濯物を干す",
  "親に電話する",
  "図書館で本を返す",
  "運転免許更新の手続きをする",
  "水植物の水を変える",
  "ジムに行く",
  "旅行の予約をする",
  "車のオイル交換をする",
  "誕生日プレゼントを選ぶ",
  "新しい靴を買う",
  "食材の買い出しをする",
];

const sampleLabelName = [
  "家事",
  "仕事",
  "勉強",
  "買い物",
  "運動",
  "趣味",
  "家族",
  "友達",
  "健康",
  "お金",
  "その他",
];

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

const schemaPath = path.resolve(__dirname, "./schema.graphql");

const typeDefs = readFileSync(schemaPath, {
  encoding: "utf8",
});

let labels = R.range(0, 10).map((i) => ({
  id: genId(),
  name: R.sample(sampleLabelName, 1)[0],
}));

let todoList = R.range(0, 10).map((i) => ({
  id: genId(),
  title: R.sample(sampleTaskTitle, 1)[0] as string,
  done: R.sample([true, false], 1)[0],
  labelIds: R.sample(labels, 3).map((label) => label.id),
}));

const findLabelList = (todo: Todo): Label[] => {
  return R.pipe(
    todo.labelIds ?? [],
    R.map((labelId) => R.find(labels, (label) => label.id === labelId)),
    R.filter((label): label is Label => R.isDefined(label))
  );
};

const filterByTitle = (title?: string) => (todoList: Todo[]) => {
  return R.isDefined(title)
    ? R.filter(todoList, (todo) => todo.title.includes(title))
    : todoList;
};

const filterByDone = (done?: boolean) => (todoList: Todo[]) => {
  return R.isDefined(done)
    ? R.filter(todoList, (todo) => todo.done === done)
    : todoList;
};

const resolvers = {
  Query: {
    todos: () => {
      return todoList;
    },
    getTodo: (parent: any, args: { id: string }) => {
      const { id } = args;
      const todo = R.find(todoList, (todo) => todo.id === id);
      if (!todo) throw new Error("Todo not found");
      return todo;
    },
    getFilterdTodoList: (parent: any, args: { filter: TodoFilter }) => {
      const { filter } = args;
      return R.pipe(
        todoList,
        filterByTitle(filter.title),
        filterByDone(filter.done),
        R.map((todo) => ({
          ...todo,
          labels: findLabelList(todo),
        }))
      );
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
