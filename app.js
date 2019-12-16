require('dotenv').config();
var express = require('express');
var app = express();
var test = require('./controllers/testcontroller')
var authTest = require('./controllers/authtestcontroller')
var sequelize = require('./DB')
var bodyParser = require('body-parser');
var user = require('./controllers/usercontroller')

sequelize.sync()
app.use(bodyParser.json());
app.use(require('./middleware/header'))
// app.get('/',function(request, response){
//     response.send('hello world');
// })

app.use('/api/user',user)

app.use('/test-controller', test)
// app.get('/api/about-me', function (req,res){
//     res.send('im 12 and from indye')
// })
app.use(require('./middleware/validate-session'))
app.use('/authtest', authTest)

app.listen(3000, function(){
    console.log('app is listening on 3000')
})


