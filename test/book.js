const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Book = require('../server/models/book');
chai.should();
chai.use(chaiHttp);

describe('Book Routes', () => {
  beforeEach(done => {
    Book.remove(err => done());
  });

  describe('GET /api/books', () => {
    it('should GET all books', done => {
      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should GET a book based on a query', done => {
      const newBook = new Book({
        title: 'Title',
        author: 'Author'
      });

      newBook.save((err, book) => {
        chai
          .request(app)
          .get('/api/books?author=Author')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  describe('POST /api/books', () => {
    it('should POST a book ', done => {
      const book = {
        title: 'Title',
        author: 'Author'
      };

      chai
        .request(app)
        .post('/api/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(book.title);
          res.body.should.have.property('author').eql(book.author);
          done();
        });
    });

    it('should have a title field', done => {
      const book = {
        author: 'Author'
      };

      chai
        .request(app)
        .post('/api/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.eql(
            'Book validation failed: title: Path `title` is required.'
          );
          done();
        });
    });

    it('should have an author field', done => {
      const book = {
        title: 'Title'
      };

      chai
        .request(app)
        .post('/api/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.eql(
            'Book validation failed: author: Path `author` is required.'
          );
          done();
        });
    });
  });

  describe('GET /api/books/:id', () => {
    it('should GET a book by id', done => {
      const newBook = new Book({
        title: 'Title',
        author: 'Author'
      });

      newBook.save((err, book) => {
        chai
          .request(app)
          .get('/api/books/' + book._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(book.title);
            res.body.should.have.property('author').eql(book.author);
            done();
          });
      });
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book', done => {
      const newBook = new Book({
        title: 'Title',
        author: 'Author'
      });
      const updatedAuthor = 'Mark Zuckerberg';

      newBook.save((err, book) => {
        chai
          .request(app)
          .put('/api/books/' + book._id)
          .send({ author: updatedAuthor })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(book.title);
            res.body.should.have.property('author').eql(updatedAuthor);
            done();
          });
      });
    });
  });

  describe('PATCH /api/books/:id', () => {
    it('should update a book', done => {
      const newBook = new Book({
        title: 'Title',
        author: 'Author'
      });
      const updatedAuthor = 'Mark Zuckerberg';

      newBook.save((err, book) => {
        chai
          .request(app)
          .patch('/api/books/' + book._id)
          .send({ author: updatedAuthor })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(book.title);
            res.body.should.have.property('author').eql(updatedAuthor);
            done();
          });
      });
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should DELETE a book by id', done => {
      const newBook = new Book({
        title: 'Title',
        author: 'Author'
      });

      newBook.save((err, book) => {
        chai
          .request(app)
          .delete('/api/books/' + book._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(book.title);
            res.body.should.have.property('author').eql(book.author);
            done();
          });
      });
    });
  });
});
