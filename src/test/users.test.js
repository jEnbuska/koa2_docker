
import {app, server} from '../server'
import supertest from 'supertest'
import {users} from '../app/data'

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
        res.body.length.should.equal(1);
        const user = res.body[0];
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
          res.body.length.should.equal(2);
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
          res.body.length.should.equal(1);
          done()
        });
      });
  });

  it('delete user', function (done) {
    request
      .delete('/users/'+referenceUser.id)
      .expect(204, () => {
        request.get('/users').expect(200, (err, res) => {
          res.body.length.should.equal(0);
          done()
        });
      });
  });
});