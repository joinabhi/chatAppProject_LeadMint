const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const userDetail=sequelize.define('UserDetail',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:Sequelize.STRING,
    room:{
        type:Sequelize.STRING,
        allowNull:false
    },
    availCoins:{
        type:Sequelize.INTEGER,
        defaultValue:500
      },
   
});

module.exports=userDetail