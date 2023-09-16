'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Enums}=require('../utils/common');
const { Op } = require("sequelize");
const {BOOKED,CANCELLED,INITIATED,PENDING}=Enums.BOOKING_STATUS;
const {BOOKING_DATE,START_TIME,END_TIME,STATUS}= Enums.UNIQUE_FIELDS_FOR_BOOKING

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MakeBookings', {
    id: {
      allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    boxCricketId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
    bookingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    endTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    status: {
      type:Sequelize.ENUM,
      values:[BOOKED,CANCELLED,INITIATED,PENDING],
      defaultValue:INITIATED,
      allowNull:false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
    });
    await queryInterface.addIndex('MakeBookings', {
      fields:[BOOKING_DATE,START_TIME,END_TIME],
      unique: true,
      where: {
        status: BOOKED
      },
      name:'unique_booked'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MakeBookings');
  }
};