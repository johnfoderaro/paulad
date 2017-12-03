const fs = require('fs');

function check(path, callback) {
  fs.stat(path, (err) => {
    if (err) return callback(new Error('Item does not exist!'));
    return callback();
  });
}

describe('build', () => {
  it('should create a \'public\' directory', (done) => {
    check('./public/', (err) => {
      if (err) done(err);
      else done();
    });
  });
});
describe('build', () => {
  it('should have \'img\' directory', (done) => {
    check('./public/img', (err) => {
      if (err) done(err);
      else done();
    });
  });
  it('should have \'css\\main.min.css\'', (done) => {
    check('./public/css/main.min.css', (err) => {
      if (err) done(err);
      else done();
    });
  });
  it('should have \'js\\main.min.js\'', (done) => {
    check('./public/js/main.min.js', (err) => {
      if (err) done(err);
      else done();
    });
  });
  it('should have \'index.html\'', (done) => {
    check('./public/index.html', (err) => {
      if (err) done(err);
      else done();
    });
  });
});
