
import {app, server} from '../server'
import supertest from 'supertest'
import {users} from '../app/data'

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
        todos.length.should.equal(2);
        todos[0].description.should.equal('eat in the morning');
        todos[1].description.should.equal('sleep during the day');
        done()
      })
  });

  it('Add todo', function (done) {
    request
      .post('/users/' + referenceUser.id + '/todos')
      .send({todo: 'do some unit testing'})
      .expect(200, (err, res) => {
        const todos = res.body;
        todos.length.should.equal(3);
        todos[0].description.should.equal('eat in the morning');
        todos[1].description.should.equal('sleep during the day');
        todos[2].description.should.equal('do some unit testing');
        request.get('/users/'+ referenceUser.id + '/todos')
          .expect(200, (err, res) => {
            res.body.length.should.equal(3);
            done()
          });
      })
  });

  it('Valid delete todo', function (done) {
    request.get('/users/' + referenceUser.id + '/todos')
      .expect(200, (err, res) => {
        const  todos = res.body;
        console.log(todos);
        request
          .delete('/users/' + referenceUser.id + '/todos/' + todos[1].id)
          .expect(200, (err, res) => {
            res.body.length.should.equal(1);
            res.body[0].description.should.equal('eat in the morning');
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
      .delete('/users/invalid/todos/' + referenceUser.todos[0].id)
      .expect(404, done)
  });

});