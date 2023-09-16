const  {StatusCodes} = require('http-status-codes');
const { BookingService } = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');

const inMemDb ={};

async function createBooking(req,res){
    
    try{
        const response= await BookingService.createBooking({
            userId: req.body.userId,
            boxCricketId: req.body.boxCricketId,
            bookingDate : req.body.bookingDate,
            startTime : req.body.startTime ,
            endTime : req.body.endTime 
        });
        SuccessResponse.data=response;
        return res 
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res 
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse)
    }

}


async function getBookingsByDateAndTime(req,res){
    
    try{
        console.log(req.query)
        const response= await BookingService.getBookingsByDateAndTime(req.query);
        SuccessResponse.data=response;
        return res 
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res 
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse)
    }

}

async function cancelBooking(req,res){
    
    try{
        console.log(req.query)
        const response= await BookingService.cancelBooking(req.query.id);
        SuccessResponse.data=response;
        return res 
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);

    }catch(error){
        ErrorResponse.error=error;
        return res 
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse)
    }

}




async function makePayment(req,res){
    try{
        // console.log("req.headers=",req.headers);
        // const idempotencyKey = req.headers["x-idempotency-key"];
        // console.log("idempotencyKey=",idempotencyKey);
        // if(!idempotencyKey){
        //     return res
        //     .status(StatusCodes.BAD_REQUEST)
        //     .json({message: 'idempotency key missing'});
        // }
        // if(inMemDb[idempotencyKey]){
        //    return res
        //              .status(StatusCodes.BAD_REQUEST)
        //              .json({message: 'cannot retry on successful payment'});
        // }
        const response= await BookingService.makePayment({
            price:req.body.price,
            userId: req.body.userId,
            bookingId:req.body.bookingId
        });
        // inMemDb[idempotencyKey]=idempotencyKey;
        SuccessResponse.data= response;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
    }catch(error){
        console.log("controller catching",error);
        ErrorResponse.error=error;
        return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse);
    }
}



module.exports={
    createBooking,getBookingsByDateAndTime,makePayment,cancelBooking
}