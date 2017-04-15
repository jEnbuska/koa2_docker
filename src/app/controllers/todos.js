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
      const newTodo = {id: hash(), description: todo, done:false};
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

const updateTodo = async (ctx) => {
  const {userId, todoId} = ctx.params;
  const user = users()[userId];
  if(user){
    const { todos, } = user;
    const todo = todos.find(({id})=> todoId===id);
    if(todo){
      const {description, done} = ctx.request.body;
      if(description && typeof description === 'string'){
        const updatedTodo = {...todo, description, done};
        user.todos = todos.map(todo => {
          if(todo.id===todoId){
            return updatedTodo
          }else{
            return todo;
          }
        });
        ctx.status = 200;
        ctx.body = user.todos;
      }else{
        ctx.body = 'Invalid todo description ' + description;
        ctx.status = 400;
      }
    }else{
      ctx.status = 404;
      ctx.body = 'no such todo ' + todoId;
    }
  }else{
    ctx.body = 'no such user '+ {userId};
    ctx.status = 404;
  }
};


const deleteTodo = async (ctx) => {
  const {userId, todoId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {todos} = user;
    const orginalLength = todos.length;
    const nextTodos = todos.filter((todo)=> todo.id!==todoId);
    if(nextTodos.length!==orginalLength){
      user.todos = nextTodos;
      ctx.status = 200;
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

module.exports = {getTodosByUser, createTodo, updateTodo, deleteTodo};
