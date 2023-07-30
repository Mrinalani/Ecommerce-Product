const Sequelise = require('sequelize')

const sequelize = require('../util/database');

const Product = sequelize.define('product',{
  id:{
    type: Sequelise.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },
  title: Sequelise.STRING,
  price: {
    type:Sequelise.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelise.STRING,
    allowNull:false
  },
  description:{
    type:Sequelise.STRING,
    allowNull:false
  }
})

module.exports = Product