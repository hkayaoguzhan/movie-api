const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movie tests', () => {
   before((done) => {
       chai.request(server)
        .post('/authenticate')
        .send({ username: "batuhannunver", password: '12771277' })
        .end((err, res) => {
            token = res.body.token;
            done();
        })
       
   });

describe('/GET movie', () => {
       it('it should GET all the moviees', (done) => {
           chai.request(server)
            .get('/api/movie')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
       })
   })

describe('/POST movie', () => {
       it('it should POST a movie', (done) => {
           const movie = {
               title: 'Udemy',
               director_id: '5e45498a4f436311b00d273e',
               category: 'Komedi',
               country: 'Turkey',
               year: 1950,
               imdb_score: 8
           }
           chai.request(server)
            .post('/api/movie/')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            })
       });
   });

describe('/GET/:director_id movie', () => {
       it('it should GET a movie by the given id', (done) => {
           chai.request(server)
            .get('/api/movie/'+movieId)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('_id').eql(movieId);
                done();
            })
       })
   })

describe('/Put/director:id', () => {
    it('it should UPDATE a movie given by id', (done) => {
        const movie = {
            title: 'Test',
            director_id: '5e45498a4f436311b00d273e',
            category: 'Test',
            country: 'Turkey',
            year: 1980,
            imdb_score: 6.4
        }
        chai.request(server)
         .put('/api/movie/'+ movieId)
         .send(movie)
         .set('x-access-token', token)
         .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
             res.body.should.have.property('title').eql(movie.title);
             res.body.should.have.property('director_id').eql(movie.director_id);
             res.body.should.have.property('category').eql(movie.category);
             res.body.should.have.property('country').eql(movie.country);
             res.body.should.have.property('year').eql(movie.year);
             res.body.should.have.property('imdb_score').eql(movie.imdb_score);
             done();
         })
    });
});

describe('/Delete/director:id', () => {
    it('it should DELETE a movie given by id', (done) => {
        chai.request(server)
         .delete('/api/movie/'+ movieId)
         .set('x-access-token', token)
         .end((err, res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
             done();
         })
    });
});


});