/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AddTodo($title: String!) {\n  addTodo(title: $title) {\n    id\n    title\n    done\n  }\n}\n\nquery GetTodoList {\n  todos {\n    title\n    id\n    done\n    labels {\n      id\n      name\n    }\n  }\n}\n\nquery GetTodo($getTodoId: ID!) {\n  getTodo(id: $getTodoId) {\n    title\n  }\n}\n\nquery GetFilterdTodoList($filter: TodoFilter) {\n  getFilterdTodoList(filter: $filter) {\n    title\n  }\n}\n\nquery GetFilterdtodo {\n  done: getFilterdTodoList(filter: {done: true}) {\n    title\n    labels {\n      name\n    }\n  }\n  yet: getFilterdTodoList(filter: {done: false}) {\n    title\n    id\n    labels {\n      id\n      name\n    }\n  }\n}": types.AddTodoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddTodo($title: String!) {\n  addTodo(title: $title) {\n    id\n    title\n    done\n  }\n}\n\nquery GetTodoList {\n  todos {\n    title\n    id\n    done\n    labels {\n      id\n      name\n    }\n  }\n}\n\nquery GetTodo($getTodoId: ID!) {\n  getTodo(id: $getTodoId) {\n    title\n  }\n}\n\nquery GetFilterdTodoList($filter: TodoFilter) {\n  getFilterdTodoList(filter: $filter) {\n    title\n  }\n}\n\nquery GetFilterdtodo {\n  done: getFilterdTodoList(filter: {done: true}) {\n    title\n    labels {\n      name\n    }\n  }\n  yet: getFilterdTodoList(filter: {done: false}) {\n    title\n    id\n    labels {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["mutation AddTodo($title: String!) {\n  addTodo(title: $title) {\n    id\n    title\n    done\n  }\n}\n\nquery GetTodoList {\n  todos {\n    title\n    id\n    done\n    labels {\n      id\n      name\n    }\n  }\n}\n\nquery GetTodo($getTodoId: ID!) {\n  getTodo(id: $getTodoId) {\n    title\n  }\n}\n\nquery GetFilterdTodoList($filter: TodoFilter) {\n  getFilterdTodoList(filter: $filter) {\n    title\n  }\n}\n\nquery GetFilterdtodo {\n  done: getFilterdTodoList(filter: {done: true}) {\n    title\n    labels {\n      name\n    }\n  }\n  yet: getFilterdTodoList(filter: {done: false}) {\n    title\n    id\n    labels {\n      id\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;