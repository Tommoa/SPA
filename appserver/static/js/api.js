define(function(require, exports, module) {
  return {
    getLatestAlert: function() {
      startPolling();
    }
  };
});

function startPolling() {
  setInterval(function() {
    retrieveLatestAlert();
  }, 5000);
}

async function retrieveLatestAlert() {
  const BASE_URL = "http://localhost:5000";
  const route = "/get_alert";
  const endpoint = BASE_URL + route;

  let alert = await fetch(endpoint).then(function(response) {
    return response.json();
  });

  renderAlert(alert);
}

function renderAlert(alert) {
  if (alert.length === 0) {
    const html = `
      <div id="no-alerts" class="center-contents"> 
        <img src="/static/app/SPA/images/warning.png" id="warning" />
        No Recent Alerts 
      </div>
    `;

    $(".latest-alert-container").html(html);
  } else {
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

    $(".latest-alert-container").html(html);
  }
}
