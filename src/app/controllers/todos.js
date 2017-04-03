"use strict";
const hash = require('random-hash').generateHash;
const users = require('../data').users;

const getTodosByUser = async  (ctx) => {
  const {userId} = ctx.params;
  if(users()[userId]){
    ctx.status = 200;
    ctx.body = users()[userId].todos;
  }else{
    ctx.status = 404;
    ctx.body = 'no such user',userId,'found'
  }
};

const createTodo = async (ctx) => {
  const {userId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {todo} = ctx.request.body;
    if(typeof todo === 'string'){
      const newTodo = {id: hash(), description: todo};
      user.todos.push(newTodo);
      ctx.body = user.todos;
      ctx.status=200;
    }else{
      ctx.body = 'todo must be of type string, got'+ {todo};
      ctx.status = 400;
    }
  }else{
    ctx.status = 404;
    ctx.body = 'No such user ' + userId;
  }
};

const deleteTodo = async (ctx) => {
  console.log('delete todo');
  const {userId, todoId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {todos} = user;
    const orginalLength = todos.length;
    console.log({orginalLength});
    const nextTodos = todos.filter((todo)=> todo.id!==todoId);
    console.log({nextTodos});
    if(nextTodos.length!==orginalLength){
      user.todos = nextTodos;
      ctx.status = 200;
      console.log({nextTodos});
      ctx.body = nextTodos;
    }else{
      ctx.status = 404;
      ctx.body = 'no such todo ' + todoId;
    }
  }else{
    ctx.body = 'no such user '+ {userId};
    ctx.status = 404;
  }
};

module.exports = {getTodosByUser, createTodo, deleteTodo};
