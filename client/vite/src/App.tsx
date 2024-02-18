import { FC, PropsWithChildren, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSuspenseQuery,
} from "@apollo/client";
import "./App.css";
import { GetTodoListDocument, Todo } from "../generated/graphql";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
  const { data } = useSuspenseQuery(GetTodoListDocument, {
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/about")}>about</button>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
      <div>about</div>
    </div>
  );
};

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

const Router = () => {
  return (
    <Route path="/">
      <Route index element={<TodoList />} />
      <Route path="/about" element={<About />} />
    </Route>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
