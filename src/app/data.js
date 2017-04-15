const hash = require('random-hash').generateHash;

const initialState = {
  klsdgk: {
    id: 'klsdgk',
      name:'John Doe',
      imageUrl: 'http://static.boredpanda.com/blog/wp-content/uploads/2016/01/manny-cat-takes-selfies-dogs-gopro-13.jpg',
      todos: [
      { id: hash(), description: 'eat in the morning', done:false},
      { id: hash(), description: 'sleep during the day', done:false}
    ]
  }
};

let state;
const users = () => {
  return state
};
const resetState = () =>  {
  state = Object.keys({...initialState}).reduce((acc, key)=> {
    acc[key] = {...initialState[key]};
    acc[key].todos = [...initialState[key].todos];
    return acc;
  }, {});
  return state;
};
state = resetState();



module.exports = {users, resetState};
