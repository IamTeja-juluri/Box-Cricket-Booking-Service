function compareDateTime(bookingDateString,startTimeString1,endTimeString2){
     
     const bookingDate=new Date(bookingDateString);
     const currentTime = new Date();

     const startTime = new Date(bookingDateString+'T'+startTimeString1);
     const endTime = new Date(bookingDateString+'T'+endTimeString2);

     return (startTime<endTime && startTime>=currentTime) && (bookingDate.getDate() >= currentTime.getDate())

}

module.exports={
     compareDateTime
}

