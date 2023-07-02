function calculateTotalTime(start, end, timePerInteger) {
    const timePerIntegerArray = timePerInteger.split(':');
    const timePerIntegerHours = parseInt(timePerIntegerArray[0], 10);
    const timePerIntegerMinutes = parseInt(timePerIntegerArray[1], 10);
  
    let totalTimeInMinutes = 0;
    for (let i = start; i <= end; i++) {
      totalTimeInMinutes += (timePerIntegerHours * 60) + timePerIntegerMinutes;
    }
  
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = totalTimeInMinutes % 60;
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }
  
//   // Example usage
//   const startingPoint = 1;
//   const endingPoint = 10;
//   const timePerInteger = 30; // Assuming each integer takes 30 minutes
  
//   const totalTimeTaken = calculateTotalTime(startingPoint, endingPoint, timePerInteger);
//   console.log("Total time taken:", totalTimeTaken);
  
  module.exports = {calculateTotalTime}

  