const express=require('express');
const userController=require('../controller/user');


const router=express.Router()

router.post('/add-signUp', userController.signUp);

router.post('/add-signIn', userController.signIn);

router.post('/add-user', userController.addUser);

router.get('/get-user', userController.getUser);

router.delete('/delete-user/:id', userController.deleteUser);

router.get('/get-specificUser', userController.getUserByUsername);

router.post('/deduct-coins',userController.deductUserCoins)


module.exports=router;