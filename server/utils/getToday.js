module.exports = {
  getToday
}
/**
 *
 *  @return 2021-04 -07
*/
function getToday() {
  let now = new Date; // now
  now.setHours(0);   // set hours to 0
  now.setMinutes(0); // set minutes to 0
  now.setSeconds(0); // set seconds to 0
  let startOfDay = Math.floor(now.getTime() / 1000);
  return startOfDay;
}
