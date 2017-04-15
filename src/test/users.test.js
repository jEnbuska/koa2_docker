import assert from 'assert';
import {app, server} from '../server'
import supertest from 'supertest'
import {users} from '../app/data'

const {keys} = Object;
const request = supertest.agent(app.listen());

let referenceUser;

describe('Users', function () {

  beforeEach((done) => {
    referenceUser = users()[Object.keys(users())[0]];
    request.get('/reset').expect(200, () => done());
  });

  after(done => {
    server.close();
    done()
  });

  it('Get all users', function (done) {
    request
      .get('/users')
      .expect(200, (err, res) => {
        const {body} = res;
        const ids = keys(body);
        assert.equal(ids.length, 1);
        const user = body[ids[0]];
        user.name.should.equal('John Doe');
        done()
      })
  });

  it('get user by id', function (done) {
    request
      .get('/users/' + referenceUser.id)
      .expect(200, (err, res) => {
        const {id, name, imageUrl} = res.body;
        id.should.equal(referenceUser.id);
        name.should.equal('John Doe');
        imageUrl.should.equal(referenceUser.imageUrl);
        done()
      })
  });

  it('create user', function (done) {
    request
      .post('/users')
      .send({name: 'Matti', imageUrl: 'some-image-url'})
      .expect(200, (err, res) => {
        const {id, name, imageUrl} = res.body;
        id.should.be.ok();
        name.should.equal('Matti');
        imageUrl.should.equal('some-image-url');
        request.get('/users').expect(200, (err, res) => {
          const ids = keys(res.body);
          assert.equal(ids.length, 2);
          done()
        })
      })
  });

  it('update user', function (done) {
    request
      .put('/users/'+referenceUser.id)
      .send({name: 'Matti', imageUrl: 'some-image-url'})
      .expect(200, (err, res) => {
        const {id, name, imageUrl} = res.body;
        name.should.equal('Matti');
        imageUrl.should.equal('some-image-url');
        request.get('/users').expect(200, (err, res) => {
          const ids = keys(res.body);
          assert.equal(ids.length, 1);
          done()
        });
      });
  });

  it('delete user', function (done) {
    request
      .delete('/users/'+referenceUser.id)
      .expect(204, () => {
        request.get('/users').expect(200, (err, res) => {
          const ids = keys(res.body);
          assert.equal(ids.length, 0);
          done()
        });
      });
  });
});