const axios = require('axios');
const {StatusCodes}=require('http-status-codes');

const { BookingRepository } = require('../repositories');
const { ServerConfig }=require('../config');
const db = require('../models');
const AppError=require('../utils/errors/app-error');
const { data } = require('../utils/common/error-response');
const { Enums } = require('../utils/common/');
const makebooking = require('../models/makebooking');
const { json } = require('sequelize');
const {BOOKED,CANCELLED,PENDING,INITIATED} = Enums.BOOKING_STATUS

const bookingRepository= new BookingRepository();

async function createBooking(data){

    const transaction = await db.sequelize.transaction();

    try{
        const boxCricket= await axios.get(`${ServerConfig.BOX_CRICKET_SERVICE}/api/v1/boxcricket/${data.boxCricketId}`);
        const boxCricketData=boxCricket.data.data;
        const conflictingBookings=await overlappingBookings(data);

        if(conflictingBookings.length>0)
            throw new AppError('Slot already booked for the given time'); 
         
        const totalBillingAmount =  boxCricketData.price;
        const bookingPayload = { ...data , price: totalBillingAmount};
        const booking = await bookingRepository.createBooking(bookingPayload,transaction);
        await transaction.commit();
    
        return booking;

    }catch(error){
        console.log("rolling back");
        await transaction.rollback();
        throw error;
    }
        
}


async function overlappingBookings(data){

    try{
        const bookings = await bookingRepository.overlappingBookings(data); 
        return bookings;
    }catch(error){
        console.log();
        throw new AppError('Couldnot retrieve bookings =',+error,StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function makePayment(data){

    const transaction = await db.sequelize.transaction();
    
    try{

        const bookingDetails= await bookingRepository.get(data.bookingId,transaction);

        if(bookingDetails.dataValues.status == CANCELLED){
            throw new AppError('Booking expired ',StatusCodes.BAD_REQUEST);
        }
        const bookingTime = new Date(bookingDetails.dataValues.createdAt);
        const currentTime = new Date(); //5*60*10

        if(currentTime - bookingTime > 300000){  //  5 mins
            await cancelBooking(data.bookingId);
            throw new AppError('Booking expired ',StatusCodes.BAD_REQUEST)
        }

        if(bookingDetails.dataValues.price != data.price ){
            throw new AppError('The amount of the payment doesnt match ',StatusCodes.BAD_REQUEST);
        }

        if(bookingDetails.dataValues.userId != data.userId){
            throw new AppError('The user corresponding to booking doesnt match ',StatusCodes.BAD_REQUEST);
        }
        
        // we assume here that payment is successful
        const response = await bookingRepository.update(data.bookingId,{status:BOOKED},transaction);
       
      
        await bookingRepository.get(data.bookingId,transaction);
        const bookingResponse =await bookingRepository.get(data.bookingId,transaction);

        await transaction.commit();
         
        return bookingResponse.dataValues;
        
    } catch(error){
        await transaction.rollback();
        throw error;
    }
}


async function getBookingsByDateAndTime(data){
   
    try{
        console.log('in booking service')
        const response = await bookingRepository.getBookingsByDateAndTime(data);
        return response;
    } catch(error){
       throw error;
    }

}



async function cancelBooking(bookingId){
    const transaction = await db.sequelize.transaction();
    try{
      const bookingDetails = await bookingRepository.get(bookingId,transaction);
       if(bookingDetails.status === CANCELLED){
        await transaction.commit();
        return {message:'Booking already cancelled'};
       }
    const response=await bookingRepository.update(bookingId,{status:CANCELLED},transaction);
    await transaction.commit();
    return response;
    }catch(error){
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings(){
    try{
        const time = new Date( Date.now() - 1000 * 300); // 5 mins ago
        const response = await bookingRepository.cancelOldBookings(time);
        return response;
    }catch(error){
       console.log(error);
    }
}


module.exports={
    createBooking,overlappingBookings,getBookingsByDateAndTime,makePayment,cancelOldBookings,cancelBooking
}
