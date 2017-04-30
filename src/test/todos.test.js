import assert from 'assert';
import {app, server} from '../server'
import supertest from 'supertest'
import {users} from '../app/data'

const {keys} = Object;
const request = supertest.agent(app.listen());

let referenceUser;

describe('Todos', function () {

  beforeEach((done) => {
    referenceUser = users()[Object.keys(users())[0]];
    request.get('/reset').expect(200, () => done());
  });

  after(done => {
    server.close();
    done()
  });

  it('Get todos by user', function (done) {
    request
      .get('/users/' + referenceUser.id + '/todos')
      .expect(200, (err, res) => {
        const todos = res.body;
        assert.equal(2, keys(todos).length);
        todos.abc.description.should.equal('eat in the morning');
        todos.cba.description.should.equal('sleep during the day');
        todos.abc.done.should.equal(false);
        todos.cba.done.should.equal(false);
        done()
      })
  });

  it('Add todo', function (done) {
    request
      .post('/users/' + referenceUser.id + '/todos')
      .send({todo: 'do some unit testing'})
      .expect(200, (err, res) => {
        const todos = res.body;
        todos.abc.description.should.equal('eat in the morning');
        todos.cba.description.should.equal('sleep during the day');
        todos[keys(todos)[2]].description.should.equal('do some unit testing');
        todos.abc.done.should.equal(false);
        todos.cba.done.should.equal(false);
        todos[keys(todos)[2]].done.should.equal(false);
        request.get('/users/'+ referenceUser.id + '/todos')
          .expect(200, (err, res) => {
            assert.equal(keys(res.body).length, 3);
            done()
          });
      })
  });

  it('Add todo with predefined id', function (done) {
    request
      .post('/users/' + referenceUser.id + '/todos')
      .send({id: 'xyz', todo: 'do some more testing'})
      .expect(200, (err, res) => {
        const todos = res.body;
        const newTodo = todos[keys(todos)[2]];
        newTodo.id.should.equal('xyz');
        newTodo.description.should.equal('do some more testing');
        newTodo.done.should.equal(false);
        done()

      })
  });

  it('Try to override predefined todo on posh', function (done) {
    request
      .post('/users/' + referenceUser.id + '/todos')
      .send({id: 'xyz', todo: 'do some more testing'})
      .expect(200, () => {
        request
          .post('/users/' + referenceUser.id + '/todos')
          .send({id: 'xyz', todo: 'do nothing'})
          .expect(400, () => {
            done()
          })
      })
  });

  it('update todo', function(done){
    request.get('/users/'+referenceUser.id+'/todos')
      .expect(200, (err, res) => {
        const firstTodoId = res.body.abc.id;
        const secondTodo = res.body.cba;
        const description = 'eat when you wake up';
        request.put('/users/'+referenceUser.id+'/todos/' + firstTodoId)
          .send({description, done: true})
          .expect(200, (err, res) => {
            keys(res.body).length.should.equal(2);
            const firstTodo = res.body.abc;
            const secondTodoAfter = res.body.cba;

            secondTodoAfter.id.should.equal(secondTodo.id);
            secondTodoAfter.description.should.equal(secondTodo.description);
            secondTodoAfter.done.should.equal(secondTodo.done);
            firstTodo.description.should.equal('eat when you wake up');
            firstTodo.done.should.equal(true);
            done();
          })
      })
  });

  it('Valid delete todo', function (done) {
    request.get('/users/' + referenceUser.id + '/todos')
      .expect(200, (err, res) => {
        const  todos = res.body;
        request
          .delete('/users/' + referenceUser.id + '/todos/' + todos.cba.id)
          .expect(200, (err, res) => {
            keys(res.body).length.should.equal(1);
            res.body.abc.description.should.equal('eat in the morning');
            done()
          })
      })
  });


  it('delete todo, invalid user and todo id', function (done) {
    request
      .delete('/users/invalid/todos/invalid')
      .expect(404, done);
  });

  it('delete todo, invalid todo id', function (done) {
    request
      .delete('/users/'+referenceUser.id+'/todos/invalid')
      .expect(404, done)
  });

  it('delete todo, invalid user id', function (done) {
    request
      .delete('/users/invalid/todos/' + referenceUser.todos.abc.id)
      .expect(404, done)
  });

});