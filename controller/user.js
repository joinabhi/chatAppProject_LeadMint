const User=require('../model/user');

const UserDetail=require('../model/userDetail')
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require('dotenv').config()

const signUp=async(req, res)=>{
  //Existing user check
  const {name, email, password, phone, deviceId}=req.body;
  try{
    const existingUser=await User.findOne({where:{email}});
    if(existingUser){
      return res.status(400).json({message:"user already exists"});
    }
    //hashedPassword
    const hashedPassword=await bcrypt.hash(password, 10)
    //user Creation
    const result=await User.create({
          name:name,
          email:email,
          password:hashedPassword,
          phone:phone,
          deviceId:deviceId
      })
    //generate token
    const token=jwt.sign({email:email, userId:result}, process.env.SECRET_KEY)
    return res.status(201).json({user:result, message:"Registration Successful", token:token})
   
  }catch(error){
    console.log(error);
    res.status(500).json({message:"something went wrong"})
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log("41", existingUser)
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { email: useremail, id: userId, ispremiumuser } = existingUser;
    const token = jwt.sign(
      { email: useremail, userId: userId, ispremiumuser },
      process.env.SECRET_KEY
    );
    console.log("Token:", token);
    res
      .status(201)
      .json({ user: existingUser, message: "User logged in successfully", token:token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addUser = async (req, res) => {
  const username = req.body.username;
  const room = req.body.room;
  try {
    const data = await UserDetail.create({
      username: username,
      room: room
    });
    res.status(201).json({ userDetails: data });
    return { username: data.username, room: data.room }; // Return only username and room
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
    return null; // Return null in case of error
  }
};

const getUser = async(req, res, next)=>{
  const user=await UserDetail.findAll();
  res.status(200).json({userDetail:user})
}

const deleteUser = async(req, res, next)=>{
  const userId=req.params.id;
  try{
      await UserDetail.destroy({where:{id:userId}})
      res.status(200).json({message:'user deleted successfully'})
  }
  catch(error){
      res.status(500).json({error:error})
  }
}

const getUserByUsername=async(username)=>{
  const data= UserDetail.findOne({ where: { username } });
  res.status(200).json({userDetail:data})

}

const deductUserCoins=async(username, availCoins)=> {
  const user = await getUserByUsername(username);
  if (user && user.availCoins >= availCoins) {
      user.availCoins -= availCoins;
      await user.save();
      return user;
  }else if(user && user.availCoins ===null){
      await user.save();
      return user;
  }
  return null;
}


module.exports={signUp, signIn, addUser, getUser, deleteUser, getUserByUsername, deductUserCoins}