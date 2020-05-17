require([
  "/static/app/SPA/js/api/polling.js",
  "/static/app/SPA/js/helper/helper.js",
], function (API, helper) {
  API.retrieveStatistics().then((statistics) => {
    populateDashboard(statistics, helper);
  });

  setInterval(function() {
    API.retrieveStatistics().then((statistics) => {
      populateDashboard(statistics, helper);
    });
  }, 60000);
});

function populateDashboard(statistics, helper) {
  // BRUTE FORCE
  const bruteForce = statistics.brute_force;
  const totalAlerts = statistics.num_alerts["24_hrs"];

  $(".daily-alert-count .content").html(totalAlerts);
  $(".num-attempts .content").html(bruteForce.num_attempts);
  $(".num-failures .content").html(bruteForce.num_failures);
  $(".num-successes .content").html(bruteForce.num_successes);

  // MULTI LOGIN
  const multiLogins = statistics.multi_logins_macs;
  let headers = ["MAC Address", "Count"];
  const multiLoginTable = helper.buildHTMLTable(multiLogins, headers);
  $(".multi-logins").html(multiLoginTable);

  // ALERTS PER CATEGORY
  const alertsPerCat = statistics.num_alerts_per_cat;
  headers = ["Alert Category", "Count"];
  const alertsHTMLTable = helper.buildHTMLTable(alertsPerCat, headers);
  $(".num-alerts-per-cat").html(alertsHTMLTable);

  // USER THREAT COUNT
  const userThreatCount = statistics.user_threat_count;
  headers = ["User ID", "Count"];
  const userThreatTable = helper.buildHTMLTable(userThreatCount, headers);
  $(".user-threat-count").html(userThreatTable);
}
