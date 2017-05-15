
const todoId1 = 'abc';
const todoId2 = 'cba';
const initialState = {
  klsdgk: {
    id: 'klsdgk',
      name:'John Doe',
      imageUrl: 'http://static.boredpanda.com/blog/wp-content/uploads/2016/01/manny-cat-takes-selfies-dogs-gopro-13.jpg',
      todos: {
        [todoId1]: { id: todoId1, description: 'eat in the morning', done:false, userId: 'klsdgk', },
        [todoId2]: { id: todoId2, description: 'sleep during the day', done:false, userId: 'klsdgk', }
      }
    }
};

let state;
const users = () => {
  return state
};
const {keys} = Object;
const resetState = () =>  {
  state = keys(initialState).reduce((acc, key)=> {
    acc[key] = {...initialState[key]};
    const todos = {...initialState[key].todos};
    acc[key].todos = keys(todos).reduce((acc, k) => {
      acc[k] = {...todos[k]};
      return acc;
    },{});
    return acc;
  }, {});
  return state;
};
state = resetState();



module.exports = {users, resetState};
