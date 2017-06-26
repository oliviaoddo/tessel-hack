var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tessel', {logging: false});

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
    },
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    getterMethods: {
        isHere: function(instance){
            Attendance.findOne({where: { studentId: instance.id, attendanceDateId: new Date().toJSON().slice(0,10)}})
            .then(function(ishere){
                if(ishere) return true;
                else return false;
            })
            .catch((err)=>{
                console.log(err);
            })
        }
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
AttendanceDate.belongsToMany(Student, {through: Attendance});




module.exports = {
    db: db,
    Fellow: Fellow,
    Student: Student,
    AttendanceDate: AttendanceDate,
    Attendance: Attendance
}
