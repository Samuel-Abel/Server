var express = require('express');
var router = express.Router()
var sequelize = require('../DB');
var TestModel= sequelize.import('../Models/test');

router.get('/helloclient',function(req,res){
    res.send('Hello from helloclient')
});

router.post('/one', function(req,res){
    res.send('Test 1 went through.')
})


router.post('/two', function(req,res){
    let data = 'this is test data 2'
    TestModel.create({
        testdata: data,
        firstname:'Sam'
    }).then(res.send('test data success'))
});

router.post('/three',function(req,res){
    let newTestData = req.body.testdata
    let newFirstName= req.body.threeFirstName
    TestModel.create({
        testdata: newTestData,
        firstname: newFirstName,
    }).then(res.send('test data success, 3'))
});

router.post('/four',function(req,res){
    let newTestData = req.body.testdata
    let newFirstName= req.body.threeFirstName
    TestModel.create({
        testdata: newTestData,
        firstname: newFirstName,
    }).then(res.send('test data success, 4'))
});

router.post('/five',function(req,res){
var testData = req.body.testdata.item;
    TestModel.create({
        testdata: testData
    }).then(function message (data){
        res.send(data);
    }
    );
});

router.post('/six',function(req,res){
    var testData = req.body.testdata.item;
    TestModel.create({
        testdata: testData
    }).then(
        function message(testdata){
            res.json({
                testdata: testdata
            });
        }
    );   
});

router.post('/seven',function(req,res){

    var testData=req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata){
            res.json({
                testdata: testdata
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

router.get('/', function(req,res){
    res.send('hey!!!! this is from the test route')
})

router.get('/one', function(req, res) {
  
    TestModel
      .findAll({ //1
          attributes: ['id', 'testdata']
      })
      .then(
          function findAllSuccess(data) {
              console.log("Controller data:", data);
              res.json(data);
          },
          function findAllError(err) {
              res.send(500, err.message);
          }
      );
  });

module.exports = router