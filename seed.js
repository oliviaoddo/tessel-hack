const {db, Fellow, Student, AttendanceDate, Attendance} = require('./models');
var Promise = require('bluebird');



var data = {
    fellows: [
        {first_name: 'Natasha', last_name: 'Desai'},
        {first_name: 'Emily', last_name: 'Tseng'},
        {first_name: 'Sam', last_name: 'Bakkila'},
        {first_name: 'Ben', last_name: 'McCain'},
        {first_name: 'Gabriel', last_name: 'Rowe'}
    ],
    students: [
        {first_name: 'Olivia', last_name: 'Oddo', fellowId: 1, id: "3ca5a500"},
        {first_name: 'Matt', last_name: 'Snow', fellowId: 2, id: "22"},
        {first_name: 'Nancy', last_name: 'Velasquez', fellowId: 3, id: "17"},
        {first_name: 'Ken', last_name: 'Russo', fellowId: 4, id: "9"},
        {first_name: 'Dan', last_name: 'Boufford', fellowId: 5, id: "04683452de2380"}
    ],
    dates: [
        {date: new Date().toJSON().slice(0,10)}
    ],
    attendances: [
        {studentId: 1, attendanceDateId: 1, photo: '111.jpg'},
        {studentId: 2, attendanceDateId: 1, photo: '112.jpg'},
        {studentId: 3, attendanceDateId: 1, photo: '113.jpg'},
        {studentId: 4, attendanceDateId: 1, photo: '114.jpg'},
        {studentId: 5, attendanceDateId: 1, photo: '115.jpg'},
    ]
}


db.sync({force: true})
.then(function () {
  const fellows = Promise.map(data.fellows, function(fellow){
     return Fellow.create(fellow);
  });
  const students = Promise.map(data.students, function(student){
     return Student.create(student);
  });
    const dates = Promise.map(data.dates, function(date){
     return AttendanceDate.create(date);
  });
    const attendances = Promise.map(data.attendances, function(attendance){
     return Attendance.create(attendance);
  });
  return Promise.all([fellows, students, dates, attendances]);
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
