const request = require('supertest');
const mockingoose = require('mockingoose');
const app = require('./app');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// check info endpoint
// eslint-disable-next-line no-undef
describe('Endpoint info', () => {
  // eslint-disable-next-line no-undef
  it('GET/info', (done) => {
    request(app).get('/info')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        res.body = { status: 'OK' };
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

// check Users
// eslint-disable-next-line no-undef
describe('Users', () => {
  // GET users
  // eslint-disable-next-line no-undef
  it('GET/users', (done) => {
    request(app).get('/users')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // POST user
  // eslint-disable-next-line no-undef
  it('POST/users', (done) => {
    request(app).post('/users')
      .expect('Content-Type', /json/)
      .send({ email: 'masha@gmai.com' })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // PUT user
  // eslint-disable-next-line no-undef
  it('PUT/users', (done) => {
    request(app).put('/users')
      .expect('Content-Type', /json/)
      .send({ name: 'alex' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // DELETE user
  // eslint-disable-next-line no-undef
  it('DELETE/users', (done) => {
    request(app).delete('/users')
      .expect('Content-Type', /json/)
      .send({ _id: '620223a2856423add726ad5c' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

// check posts
// eslint-disable-next-line no-undef
describe('Posts', () => {
  // GET posts
  // eslint-disable-next-line no-undef
  it('GET/posts', (done) => {
    request(app).get('/posts')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body = { pages: null, page: '1', limit: '10' };
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // POST post
  // eslint-disable-next-line no-undef
  it('POST/posts', (done) => {
    request(app).post('/posts')
      .expect('Content-Type', /json/)
      .send({ title: 'Test', body: 'Test post' })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // PUT post
  // eslint-disable-next-line no-undef
  it('PUT/posts', (done) => {
    request(app).put('/posts')
      .expect('Content-Type', /json/)
      .send({ title: 'change' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // DELETE post
  // eslint-disable-next-line no-undef
  it('DELETE/posts', (done) => {
    request(app).delete('/posts')
      .expect('Content-Type', /json/)
      .send({ _id: '620df9bfe23774ac55ffa66f' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

// check comments
// eslint-disable-next-line no-undef
describe('Comments', () => {
  // POST comment
  // eslint-disable-next-line no-undef
  it('POST/comment', (done) => {
    request(app).post('/comment')
      .expect('Content-Type', /json/)
      .send({ body: 'Test comment' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // PUT comment
  // eslint-disable-next-line no-undef
  it('PUT/comment', (done) => {
    request(app).put('/comment')
      .expect('Content-Type', /json/)
      .send({ title: 'change' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // DELETE comment
  // eslint-disable-next-line no-undef
  it('DELETE/comment', (done) => {
    request(app).delete('/comment')
      .expect('Content-Type', /json/)
      .send({ _id: '620df9bfe23774ac55ffa66f' })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

// check Users with mongoose
// eslint-disable-next-line no-undef
describe('test mongoose User model', () => {
  // eslint-disable-next-line no-undef
  it('should return the doc with find', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Masha',
      email: 'masha@gmail.com',
      password: '123456',
      isActive: true,
    };
    mockingoose(User).toReturn(_doc, 'find');
    return User.find()
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with findById', () => {
    const _doc = [
      {
        _id: '507f191e810c19729de860ea',
        name: 'Masha',
        email: 'masha@gmail.com',
        password: '123456',
        isActive: true,
      }, {
        _id: '507f191e810c19729de860eb',
        name: 'Masha1',
        email: 'masha1@gmail.com',
        password: '123456',
        isActive: true,
      },
    ];
    mockingoose(User).toReturn(_doc, 'findOne');
    return User.findById({ _id: '507f191e810c19729de860ea' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with update', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Masha',
      email: 'masha@gmail.com',
      password: '123456',
      isActive: true,
    };
    mockingoose(User).toReturn(_doc, 'update');
    return User.update({ name: 'Masha changed' })
      .where({ _id: '507f191e810c19729de860ea' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with delete', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Masha',
      email: 'masha@gmail.com',
      password: '123456',
      isActive: true,
    };
    mockingoose(User).toReturn(_doc, 'delete');
    return User.deleteOne({ _id: '507f191e810c19729de860ea' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect({
          _id: '507f191e810c19729de860ea',
          email: 'masha@gmail.com',
          isActive: true,
          name: 'Masha',
          password: '123456',
        });
      });
  });
});
// check Posts with mongoose
// eslint-disable-next-line no-undef
describe('test mongoose Post model', () => {
  // eslint-disable-next-line no-undef
  it('should return the doc with find', () => {
    const _doc = [
      {
        user: '507f191e810c19729de860ea',
        title: 'Troll Cave',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        isActive: true,
        comments: [],
        _id: '620ca8379708cc1d009c48c9',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      }, {
        user: '507f191e810c19729de860ea',
        title: 'Caradhras Iceberg',
        body: 'Lorem ipsum, dolor sit',
        isActive: true,
        comments: [],
        _id: '620a3420c8a885098a7a98d0',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      },
    ];
    mockingoose(Post).toReturn(_doc, 'find');
    return Post.find()
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with findById', () => {
    const _doc = [
      {
        user: '507f191e810c19729de860ea',
        title: 'Troll Cave',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        isActive: true,
        comments: [],
        _id: '620ca8379708cc1d009c48c9',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      }, {
        user: '507f191e810c19729de860ea',
        title: 'Caradhras Iceberg',
        body: 'Lorem ipsum, dolor sit',
        isActive: true,
        comments: [],
        _id: '620a3420c8a885098a7a98d0',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      },
    ];
    mockingoose(Post).toReturn(_doc, 'findOne');
    return Post.findById({ _id: '620ca8379708cc1d009c48c9' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with update', () => {
    const _doc = {
      user: '507f191e810c19729de860ea',
      title: 'Troll Cave',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
      isActive: true,
      comments: [],
      _id: '620ca8379708cc1d009c48c9',
      createdAt: '2022-02-14T10:49:58.571Z',
      updatedAt: '2022-02-16T07:31:03.214Z',
    };
    mockingoose(Post).toReturn(_doc, 'update');
    return Post.update({ title: 'Troll Cave changed' })
      .where({ _id: '620ca8379708cc1d009c48c9' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with delete', () => {
    const _doc = [
      {
        user: '507f191e810c19729de860ea',
        title: 'Troll Cave',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        isActive: true,
        comments: [],
        _id: '620ca8379708cc1d009c48c9',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      }, {
        user: '507f191e810c19729de860ea',
        title: 'Caradhras Iceberg',
        body: 'Lorem ipsum, dolor sit',
        isActive: true,
        comments: [],
        _id: '620a3420c8a885098a7a98d0',
        createdAt: '2022-02-14T10:49:58.571Z',
        updatedAt: '2022-02-16T07:31:03.214Z',
      },
    ];
    mockingoose(User).toReturn(_doc, 'delete');
    return User.deleteOne({ _id: '620a3420c8a885098a7a98d0' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect({
          user: '507f191e810c19729de860ea',
          title: 'Caradhras Iceberg',
          body: 'Lorem ipsum, dolor sit',
          isActive: true,
          comments: [],
          _id: '620a3420c8a885098a7a98d0',
          createdAt: '2022-02-14T10:49:58.571Z',
          updatedAt: '2022-02-16T07:31:03.214Z',
        });
      });
  });
});
// check Comments with mongoose
// eslint-disable-next-line no-undef
describe('test mongoose Comment model', () => {
  // eslint-disable-next-line no-undef
  it('should return the doc with update', () => {
    const _doc = {
      user: '620223a2856423add726ad5c',
      body: 'comment 1',
      isActive: true,
      _id: '620cc7aa4862a749f21cd488',
      createdAt: '2022-02-14T10:49:58.571Z',
      updatedAt: '2022-02-16T07:31:03.214Z',
    };
    mockingoose(Comment).toReturn(_doc, 'update');
    return Comment.update({ body: 'comment 1 changed' })
      .where({ _id: '620cc7aa4862a749f21cd488' })
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
  // eslint-disable-next-line no-undef
  it('should return the doc with delete', () => {
    const _doc = {
      user: '620223a2856423add726ad5c',
      body: 'comment 1',
      isActive: true,
      _id: '620cc7aa4862a749f21cd488',
      createdAt: '2022-02-14T10:49:58.571Z',
      updatedAt: '2022-02-16T07:31:03.214Z',
    };
    mockingoose(Comment).toReturn(_doc, 'delete');
    return Comment.deleteOne()
      .then((doc) => {
        // eslint-disable-next-line no-undef
        expect({
          user: '620223a2856423add726ad5c',
          body: 'comment 1',
          isActive: true,
          _id: '620cc7aa4862a749f21cd488',
          createdAt: '2022-02-14T10:49:58.571Z',
          updatedAt: '2022-02-16T07:31:03.214Z',
        });
      });
  });
});
