
// ISOString 형태를 client에 맞게 변형
// return data: Object{ relative, absolute }
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = day * 365;
export const modifyTime = (ISOString) => {
  const receivedTime = new Date(ISOString);
  const timeNow = new Date();
  const timeGapSec = Math.floor((timeNow - receivedTime) / 1000);

  // make Time Value to return
  const absolute = ISOString.slice(0, 10).replaceAll("-", ". ") + ".";
  let relative;

  let timeUnit;
  if(timeGapSec < minute) timeUnit = "second";
  else if (timeGapSec < hour) timeUnit = "minute";
  else if (timeGapSec < day) timeUnit = "hour";
  else if (timeGapSec < month) timeUnit = "day";
  else if (timeGapSec < year) timeUnit = "month";
  else timeUnit = "year";

  switch(timeUnit) {
    case "second": 
      break;
  }
}