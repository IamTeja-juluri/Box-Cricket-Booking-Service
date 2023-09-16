'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize");
const {Enums}=require('../utils/common');
const {BOOKED,CANCELLED,INITIATED,PENDING}=Enums.BOOKING_STATUS;
const {BOOKING_DATE,START_TIME,END_TIME,STATUS}= Enums.UNIQUE_FIELDS_FOR_BOOKING

module.exports = (sequelize, DataTypes) => {
  class MakeBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
    
  }
  MakeBooking.init({
  userId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  boxCricketId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  bookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
  },
  startTime: {
      type: DataTypes.TIME,
      allowNull: false
  },
  endTime: {
      type: DataTypes.TIME,
      allowNull: false
  },
  status: {
    type:DataTypes.ENUM,
    values:[BOOKED,CANCELLED,INITIATED,PENDING],
    defaultValue:INITIATED,
    allowNull:false
  }, 
  price: {
    type: DataTypes.INTEGER,
    allowNull:false
  }
  }, {
    sequelize,
    modelName: 'MakeBooking',
    indexes: [
      // Add unique index constraint
      {
        fields: [BOOKING_DATE,START_TIME,END_TIME],
        unique: true,
        where: {
          status:BOOKED
        },
        name: 'unique_booked'
      }
    ]
  });
  return MakeBooking;
};