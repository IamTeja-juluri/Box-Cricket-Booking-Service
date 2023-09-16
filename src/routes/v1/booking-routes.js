const express = require('express');
const router=express.Router();
const {BookingController} =require('../../controllers');
const {BookingMiddlewares} = require('../../middlewares')

router.post('/',
                 BookingMiddlewares.validateCreateRequest,BookingController.createBooking);

router.get('/getBookingsOfSpecificDate',
                                        BookingMiddlewares.validateGetRequestForGetBookingsOfSpecificDate,BookingController.getBookingsByDateAndTime);

router.get('/cancel',
                    BookingController.cancelBooking);                                        

router.post('/payments',
                        BookingController.makePayment);

module.exports=router;
