var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController'); 




router.get('/classes', userController.getClasses)
router.post('/createclass', userController.createClass)
router.post('/joinclass/:cid/:sid', userController.joinClass)
router.get('/joinedclasses/:sid', userController.joinedClasses)
router.get('/createdclasses/:tid', userController.createdClasses)

//GET users listing. 
router.get('/', userController.getUsers);
//POST user
router.post('/add', userController.upload, userController.addUser);
//update call
router.post('/update/:id', userController.upload, userController.updateUser)
//delete call
router.get('/delete/:id', userController.deleteUser)
//search 
router.get('/:id', userController.searchUser)

module.exports = router;
