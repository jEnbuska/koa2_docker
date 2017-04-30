"use strict";
const hash = require('random-hash').generateHash;
const { keys } = Object;
const users = require('../data').users;

const getUsers = async  (ctx) => {
  ctx.body = keys(users()).reduce((acc, key)=> {
    const {id, name, imageUrl} = users()[key];
    acc[id] = {id, name, imageUrl};
    return acc;
  }, {});
  ctx.status = 200;
};

const getUserById = async (ctx) => {
  const {userId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {name, imageUrl, id} = user;
    ctx.body = {name, imageUrl, id};
    ctx.status=200;
  }else{
    ctx.status = 404;
    ctx.body = 'No such user ' + userId;
  }
};

const createUser = async (ctx) => {
  const {name, imageUrl} = ctx.request.body;
  let {id} = ctx.request.body;
  if(typeof name === 'string' && typeof imageUrl === 'string'){
    if(!id){
      id= hash();
    }
    if(users()[id]){
      ctx.body = 'Users already exists'+ id;
      ctx.status = 400;
    }else{
      users()[id] = {id, name, imageUrl, todos: [] };
      ctx.status = 200;
      ctx.body = {id, name, imageUrl};
    }
  }else{
    ctx.body = 'name and imageUrl must be of type string, got '+ {imageUrl, name};
    ctx.status = 400;
  }
};

const updateUser = async (ctx) => {
  const {userId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {name, imageUrl} = ctx.request.body;
    if(typeof name === 'string' && typeof imageUrl === 'string'){
      user.imageUrl = imageUrl;
      user.name = name;
      ctx.body = {id: userId, name: user.name, imageUrl: user.imageUrl};
      ctx.status=200;
    }else{
      ctx.body = 'name and imageUrl must be of type string, got '+ {imageUrl, name};
      ctx.status = 400;
    }
  }else{
    ctx.status = 404;
    ctx.body = 'no such user ' + userId +' found'
  }
};

const deleteUser = async (ctx) => {
  const {userId} = ctx.params;
  const user = users()[userId];
  if(user){
    delete users()[userId];
    ctx.status = 204;
  }else{
    ctx.status = 404;
    ctx.body = 'no such user ' + userId +' found'
  }
};

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser};
