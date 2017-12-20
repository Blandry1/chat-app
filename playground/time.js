var moment =require('moment');

var someTimestamp = moment().valueOf();
var date = moment(someTimestamp);
console.log(date.format('h:mm a '));  //10:15 am
console.log(date.format('h:mm a, MMM Do')); //10:15 am, Dec 2nd
console.log(date.format('h:mm a, MMM Do, YYYY')); //10:15 am, Dec 2nd, 2017
