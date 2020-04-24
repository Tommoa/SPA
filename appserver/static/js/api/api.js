define(function (require, exports, module) {
  const polling = require('/static/app/SPA/js/api/polling.js');

  exports.getLatestAlert = function () {
    polling.getLatestAlert();
  };
});
