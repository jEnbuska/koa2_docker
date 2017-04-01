"use strict"
const hash = require('random-hash');
const { keys } = Object;
const users = require('../data');

const getUsers = async  (ctx) => {
  ctx.body = keys(users).map(key => {
    const {id, name, imageUrl} = users[key];
    return {id, name, imageUrl};
  });
  ctx.status = 200;
}

const getUserById = async (ctx) => {
  const {userId} = ctx.params;
  const user = users[userId];
  if(user){
    const {name, imageUrl, userId} = user;
    ctx.body = {name, imageUrl, userId};
    ctx.status=200;
  }else{
    ctx.status = 404;
    ctx.body = 'No such user ' + userId;
  }
}

const  createUser = async (ctx) => {
  const {name, imageUrl} = ctx.body
  if(typeof name === 'string' && typeof imageUrl === 'string'){
    const userId = hash()
    users[userId] = {userId, name, imageUrl, todos: [] };
    ctx.status = 200;
    ctx.body = {userId, name, imageUrl};
  }else{
    ctx.body = 'name and imageUrl must be of type string, got'+ {imageUrl, name}
    ctx.status = 400;
  }
}

const updateUser = async (ctx) => {
  const {userId} = ctx.params;
  const user = users[userId];
  if(user){
    const {name, imageUrl} = user;
    if(typeof name === 'string' && typeof imageUrl === 'string'){
      ctx.body = {name, imageUrl};
      ctx.status=200;
    }else{
      ctx.body = 'name and imageUrl must be of type string, got'+ {imageUrl, name}
      ctx.status = 400;
    }
  }else{
    ctx.status = 404;
    ctx.body = 'no such user',userId,'found'
  }
}
module.exports = {getUsers, getUserById, createUser, updateUser}
