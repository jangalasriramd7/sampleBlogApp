const express = require('express');

const router = express.Router();

const mongoType = require('mongoose').Types;

const Post = require('../Backend/model/Post.js');

//routes
//getAll

router.get('/', (req, res) => {
    Post.find().then(doc => {
        res.send(doc);
    })
    .catch(err => {
        console.log("Error occurred while fetching data " + err);
        res.status(400).send('Internal Error', err);
    })
})

//create 

router.post('/create', async (req, res) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    })
    await post.save().then(doc => {
        res.send(doc);
    })
    .catch(err => {
        console.log("Internal Error : " + err);
        res.status(400).send('Internal Error : ' + err);
    })
})

//get Data by ID

router.get('/:id', (req, res) => {
    if(mongoType.ObjectId.isValid(req.params.id)){
        Post.findById(req.params.id).then(doc => {
            res.send(doc);
            console.log(doc);
        })
        .catch(err => {
            console.log("Error occurred while fetching data " + err);
            res.status(400).send('Internal Error', err);
        })
    }
    else{
        res.status(400).send("Id is not valid or not found : ", id);
    }
});

//delete Data by ID

router.delete('/:id', (req, res) => {
    if(mongoType.ObjectId.isValid(req.params.id)){
        Post.findByIdAndDelete(req.params.id).then(doc => {
            res.status(200).send(doc);
        })
        .catch(err => {
            console.log("Error occurred while fetching data " + err);
            res.status(400).send('Internal Error', err);
        })
    }
    else{
        res.status(400).send("Id is not valid or not found : ", id);
    }
});

//update data by ID
router.put('/update/:id', async(req, res, next) => {
    let post = ({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    })
    
    if(mongoType.ObjectId.isValid(req.params.id)){
       
        await Post.findByIdAndUpdate(req.params.id, {$set:post}, {new:true}).then(doc => {
            res.status(200).json({'message': 'Successfully updated'});
        })
        .catch(err => {
            console.log("Error occurred while fetching data " + err);
            res.status(400).send('Internal Error : ' +  err);
        })
    }
    else{
        res.status(400).send("Id is not valid or not found : ", id);
        res.send(doc);
        console.log(doc);
    }
});


module.exports = router;

