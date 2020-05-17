require([
  "/static/app/SPA/js/api/polling.js",
], function(API) {
  API.retrieveStatistics().then(statistics => {
    console.dir(statistics);
  });
});