const { StatusCodes }=require('http-status-codes');

const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

const  {DateTimeHelper} = require('../utils/index')

function validateCreateRequest(req,res,next){

    if(!req.body.userId){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['userId not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.boxCricketId){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['boxCricketId not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.bookingDate){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['bookingDate not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.startTime){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['startTime not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.endTime){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['endTime not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }


    if(!(DateTimeHelper.compareDateTime(req.body.bookingDate,req.body.startTime,req.body.endTime))){
        
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['startTime or endTime or booking date not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);     
    }

   
    next();  //controller is the next middleware
};


function  validateGetRequestForGetBookingsOfSpecificDate(req,res,next){
    if(!req.query.bookingDate){
        ErrorResponse.message='Something went wrong while booking a ground';
        ErrorResponse.error=new AppError(['date not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();
}



module.exports={
    validateCreateRequest,validateGetRequestForGetBookingsOfSpecificDate
}