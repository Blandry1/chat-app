var moment = require('moment');

var currentTime = moment();

var variousTimes = (postedTime) => {
  console.log(currentTime);
  console.log(postedTime);
  if(currentTime === moment().date(postedTime)) {
    return moment().format('h:mm a');
  }
  else if(currentTime !== moment().date(postedTime)) {
    return moment().format('h:mm a, MMM Do');
  }
  else if(currentTime !== moment().dayOfYear(postedTime)) {
    return moment().format('h:mm a, MMM Do, YYYY');
  }
};

module.exports = {variousTimes};
