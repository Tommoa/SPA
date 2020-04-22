define(function (require, exports, module) {
  const helper = require('/static/app/SPA/js/helper/helper.js');
  
  exports.splitString = function(name, cookiesString, delimiter) {
    return helper.splitString(name, cookiesString, delimiter);
  }

  exports.getLatestAlert = function () {
    startPolling();
  };
});

function startPolling() {
  retrieveLatestAlert(); // on initial load call

  setInterval(function () {
    retrieveLatestAlert();
  }, 10000);
}

function retrieveBaseURL() {
  const cookies = document.cookie;
  const delimiter = "; ";
  const baseURL = splitString("baseURL", cookies, delimiter);

  if (baseURL === undefined) {
    console.dir("BASE_URL has not been set, using default URL");
    return "http://localhost:5000/";
  }

  return baseURL;
}

function formatAlert(alert) {
  if (alert.length === 0) {
    const html = `
      <div id="no-alerts" class="center-contents"> 
        <img src="/static/app/SPA/images/warning.png" id="warning" />
        No Recent Alerts 
      </div>
    `;
    return html;
  }

  const latestAlert = alert[0];
  const alertDescription = latestAlert.alert;
  const user = latestAlert.user;
  const timestamp = latestAlert.timestamp;

  const html = `
  <div class ="latest-alert">
    <div id="latest-alert-header">
      <div id="latest-alert-timestamp">${timestamp}</div>
      <div id="latest-alert-title">Alert</div>
      <div id="latest-alert-description"> 
        ${alertDescription} (${user})
      </div>
    </div>
  </div>`;

  return html;
}

async function retrieveLatestAlert() {
  const BASE_URL = retrieveBaseURL();

  const route = "get_alert";
  const endpoint = BASE_URL + route;

  const alert = await fetch(endpoint).then(function (response) {
    return response.json();
  });

  const alertHTML = formatAlert(alert);
  $(".latest-alert-container").html(alertHTML);
}


