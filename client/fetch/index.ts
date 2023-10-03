const res = await fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
    query GetTodoList {
      getTodoList {
        title
        id
        done
      }
    }
    `,
  }),
}).then((res) => res.json());

console.log({ res });

const todo = res.data.getTodoList[0];

const res2 = await fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
    query GetTodo($getTodoId: ID!) {
      getTodo(id: $getTodoId) {
        title
      }
    }
    `,
    variables: {
      getTodoId: todo.id,
    },
  }),
}).then((res) => res.json());

console.log({ res2 });
