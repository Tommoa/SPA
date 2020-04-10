define(function (require, exports, module) {
  const helper = require('/static/app/SPA/js/helper.js');

  return {
    getToFromDate: function getToFromDate() {
      const today = new Date();
      let todate = helper.formatDateToString(today);
      today.setMonth(today.getMonth() - 3);
      let fromdate = helper.formatDateToString(today);
      return [todate, fromdate];
    },
  }
});

