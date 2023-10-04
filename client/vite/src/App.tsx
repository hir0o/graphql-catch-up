import { FC, PropsWithChildren, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import "./App.css";
import {
  GetTodoDocument,
  GetTodoListDocument,
  Todo,
} from "../generated/graphql";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <div className="App">{children}</div>
    </ApolloProvider>
  );
};

const Todo: FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <li>
      <div>
        <span>{todo.title}</span>
        <span>{todo.done ? "完了" : "未完了"}</span>
      </div>
    </li>
  );
};

const TodoList: FC = () => {
  const { data } = useQuery(GetTodoListDocument);
  return (
    <ul>
      {data?.todos
        ?.filter((todo): todo is Todo => todo !== null)
        .map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
    </ul>
  );
};

const App: FC = () => {
  return (
    <Provider>
      <TodoList />
    </Provider>
  );
};

export default App;
