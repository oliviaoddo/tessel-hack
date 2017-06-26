var express = require('express');
var app = express();
var Promise = require('bluebird')

var nunjucks = require('nunjucks');

var {db, Student, Attendance, Date, Fellow} = require('./models');


nunjucks.configure('views', {
    express: app
});


app.get('/', (req, res) => {
  var studentProm = Student.findAll();
  var fellowProm = Fellow.findAll();

  Promise.all([studentProm, fellowProm])
  .spread((studentData, fellowData) => {
    res.render('index', {fellows: fellowData, students: studentData});
  });

})

app.get('/:id', (req, res) => {
  // check if user with id has logged in, if not log them in

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
