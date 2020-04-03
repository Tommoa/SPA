define(function (require, exports, module) {
  return {
    getToFromDate: function getToFromDate() {
      const today = new Date();
      let todate = formatDateToString(today);
      today.setMonth(today.getMonth() - 3);
      let fromdate = formatDateToString(today);
      return [todate, fromdate];
    }
  }
});

function formatDateToString(date){
  // 01, 02, 03, ... 29, 30, 31
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  // 01, 02, 03, ... 10, 11, 12
  const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
  // 1970, 1971, ... 2015, 2016, ...
  const yyyy = date.getFullYear();

  // create the format you want
  return (yyyy + "-" + MM + "-" + dd);
 }


