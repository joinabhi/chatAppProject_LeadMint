const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('user',{
id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false
       },
   password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    deviceId:{
        type:Sequelize.STRING,
        allowNull:false
    }


});

module.exports=User;