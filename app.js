var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

var Promise = require('bluebird')

app.get('/', (req, res) => {
  // find all students, include fellows
  // render into template
})

app.get('/:id', (req, res) => {
  // check if user with id has logged in, if not log them in
  var student;

  var studentProm = Student.findById(req.params.id);

  var dateProm = Date.findOrCreate({
    where: {
      date: new Date().toJSON().slice(0,10)
    },
    default: {
      date: new Date().toJSON().slice(0,10)
    }
  })
  Promise.all([studentProm, dateProm])
  .spread((studentProm, dateProm) => {
     return Attendance.create({
      dateId: dateProm.id,
      studentId: studentProm.id
    })
  })


})

app.listen(8080, () => {
  console.log('Server listening 8080...');
})
