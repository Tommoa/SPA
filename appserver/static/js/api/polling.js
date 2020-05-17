define(function (require, exports, module) {
  const helper = require('/static/app/SPA/js/helper/helper.js');
  
  exports.retrieveHeatmapData = async function() {
    const data = await retrieveHeatmapData();
    return data;
  };

  exports.retrieveAlerts = async function() {
    const data = await retrieveAlerts();
    return data;
  }

  exports.retrieveStatistics = async function() {
    const data = await retrieveStatistics();
    return data;
  }

  exports.getLatestAlert = function () {
    startPolling();
  };

  function startPolling() {
    retrieveLatestAlert(); // on initial load call
  
    setInterval(function () {
      retrieveLatestAlert();
    }, 60000);
  }
  
  function retrieveBaseURL() {
    const cookies = document.cookie;
    const delimiter = "; ";
    const baseURL = helper.splitString("baseURL", cookies, delimiter);
  
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
  
    const headers = await login(BASE_URL);
    
    const route = "get_latest_alert/";
    const endpoint = BASE_URL + route;
  
    const alert = await fetch(endpoint, {headers}).then(function (response) {
      return response.json();
    });
  
    const alertHTML = formatAlert(alert);
    $(".latest-alert-container").html(alertHTML);
  }
  
  async function retrieveHeatmapData() {
    const BASE_URL = retrieveBaseURL();
    
    const headers = await login(BASE_URL);
  
    const route = "get_locations/";
    const endpoint = BASE_URL + route;
  
    let heatmapData = await fetch(endpoint, {headers}).then(function(response) {
      return response.json();
    });
    
    return heatmapData;
  }

  async function retrieveAlerts() {
    const BASE_URL = retrieveBaseURL();
    
    const headers = await login(BASE_URL);
  
    const route = "get_alerts/";
    const endpoint = BASE_URL + route;
  
    let alerts = await fetch(endpoint, {headers}).then(function(response) {
      return response.json();
    });
    
    return alerts;
  }

  async function retrieveStatistics() {
    const BASE_URL = retrieveBaseURL();
    
    const headers = await login(BASE_URL);
  
    const route = "get_statistics/";
    const endpoint = BASE_URL + route;
  
    let statistics = await fetch(endpoint, {headers}).then(function(response) {
      return response.json();
    });
    
    return statistics;
  }
  
  async function login(BASE_URL) {
    const route = "login/";
    const endpoint = BASE_URL + route;
  
    const username = "Username";
    const password = "Group1Password";
    let authString = `${username}:${password}`;
  
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(authString),
      "Access-Control-Allow-Origin": "*"
    });
  
    const response = await fetch(endpoint, {headers}).then(response => {return response.json()});
    const jwt = response.token;
    
    const jwtHeader = new Headers({
      "x-access-token": jwt
    })
  
    return jwtHeader;
  }
});
