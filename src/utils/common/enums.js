const BOOKING_STATUS={
    BOOKED:'booked',
    CANCELLED:'cancelled',
    INITIATED:'initiated',
    PENDING:'pending'
}

const UNIQUE_FIELDS_FOR_BOOKING ={
  BOOKING_DATE:'bookingDate',
  START_TIME:'startTime',
  END_TIME: 'endTime',
  STATUS:'status'
}

module.exports={
    BOOKING_STATUS,UNIQUE_FIELDS_FOR_BOOKING
}