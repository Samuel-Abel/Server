var express = require('express');
var router = express.Router()
var sequelize = require('../DB')
var User = sequelize.import('../Models/user')
var AuthTestModel = sequelize.import('../models/authtest')

router.get('/getall', function(req,res){
    //grabbing all of the list items from database for a given user
    var userid = req.user.id
    AuthTestModel.findAll({
        where:{owner:userid}
    }).then(
        function findAllSuccess(data){
            res.json(data)
        }, function findAll(err){
            res.send(500, err.message)
        }
    );
});

// posting data for a given user
//localhost:3000/api/authtest/create
//what goes in the body
//{authtestdata: {item:_____}}

router.post('/create', function(req,res){
    var owner = req.user.id
    var authTestData = req.body.authtestdata.item 

    AuthTestModel.create({
        authtestdata: authTestData,
        owner: owner
    }).then(
        function createSuccess(authtestdata){
            res.json({
                authtestdata: authtestdata
            })
        },
        function createError(err){
            res.send(500, err.message)
        }
    );
});

//localhost:3000/authtest/Prim

router.get('/:id',function(req,res){
    var primaryKey = req.params.id;
    var userid = req.user.id
    AuthTestModel.findOne(
        { where: {id:primaryKey,
                owner: userid}
            }).then(
        data => {
            return data? res.json(data): res.send('Not Authorized to view.');
        }), 
        err => res.send(500, err.message);
});

router.delete('/delete/:id',function(req,res){
    var primaryKey = req.params.id
    var userid = req.user.id

    AuthTestModel.destroy({
        where:{id: primaryKey, owner: userid}
    }).then(data =>{
        return res.json(data)
    }), err => res.send(500,err.message)
})
//updating record for the individual
//endpoint: /update/[number here]
router.put('/update/:id', function (req, res){
    var userid = req.user.id; 
    var primaryKey = req.params.id
    var authTestData = req.body.authtestdata.item

    AuthTestModel.update({
        authtestdata: authTestData
    },
    {where:{id: primaryKey, owner: userid}}
    ).then(
        data => {
            return res.json(data)
        }), 
        err => res.send(500, err.message);
});
module.exports = router;