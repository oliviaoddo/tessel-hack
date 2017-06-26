var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tessel');

const Fellow = db.define('fellow', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Student = db.define('student', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Attendance = db.define('attendance', {
    photo: Sequelize.TEXT
});

const AttendanceDate = db.define('attendanceDate', {
    date: Sequelize.DATEONLY
});

Student.belongsTo(Fellow);
Fellow.hasMany(Student);
Student.belongsTo(Attendance);
//AttendanceDate.belongsToMany(Student, {through: Attendance});



module.exports = {
    db: db,
    Fellow: Fellow,
    Student: Student,
    AttendanceDate: AttendanceDate,
    Attendance: Attendance
}
