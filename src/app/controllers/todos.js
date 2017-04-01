"use strict"
const hash = require('random-hash');
const users = require('../data');

const getTodosByUser = async  (ctx) => {
  const {userId} = ctx.params;
  if(users[userId]){
    ctx.status = 200;
    ctx.body = users[userId].todos;
  }else{
    ctx.status = 404;
    ctx.body = 'no such user',userId,'found'
  }
}

const createTodo = async (ctx) => {
  const {userId} = ctx.params;
  const user = users[userId];
  if(user){
    const {todo} = ctx.body;
    if(typeof todo === 'string'){
      const newTodo = {id: hash(), description: todo}
      user.todos.push(newTodo)
      ctx.body = user.todos;
      ctx.status=200;
    }else{
      ctx.body = 'todo must be of type string, got'+ {todo}
      ctx.status = 400;
    }
  }else{
    ctx.status = 404;
    ctx.body = 'No such user ' + userId;
  }
}

const  deleteTodo = async (ctx) => {
  const {userId, todoId} = ctx.params;
  const user = users[userId];
  if(user){
    const {todos} = user;
    const orginalLength = todos.length;
    const nextTodos = todos.filter((todo)=> todo.id!==todoId)
    if(nextTodos.length!==orginalLength){
      user.todos = nextTodos;
      ctx.status = 200;
      ctx.body = nextTodos;
    }
  }else{
    ctx.body = 'name and imageUrl must be of type string, got'+ {imageUrl, name}
    ctx.status = 400;
  }
}

module.exports = {getTodosByUser, createTodo, deleteTodo}
