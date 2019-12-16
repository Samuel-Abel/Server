const  Sequilize = require('sequelize')
const sequelize = new Sequilize('Workout Log', 'postgres', 'password', {
host: 'localhost',
dialect: 'postgres'
})

sequelize
.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
})
.catch(err=>{
    console.log('Unable to connect to the database:',err);
})
;

module.exports= sequelize