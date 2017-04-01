const hash = require('random-hash').generateHash;

const users = {
  klsdgk: {
    id: 'klsdgk',
    name:'John Doe',
    imageUrl: 'http://static.boredpanda.com/blog/wp-content/uploads/2016/01/manny-cat-takes-selfies-dogs-gopro-13.jpg',
    todos: [
      { id: hash(), description: 'eat in the morning'},
      { id: hash(), description: 'sleep during the day'}
    ]
  }
}
module.exports = users;
