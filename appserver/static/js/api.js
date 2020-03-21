define(function(require, exports, module) {
  return {
    getLatestAlert: function() {
      startPolling();
    },
    getCookie: function(name, cookiesString) {
      return getCookie(name, cookiesString);
    }
  };
});

function startPolling() {
  retrieveLatestAlert(); // on initial load call

  setInterval(function() {
    retrieveLatestAlert();
  }, 10000);
}

function getCookie(name, cookiesString) {
  const cookiesList = cookiesString.split("; ");

  const cookieValue = cookiesList.reduce((acc, cookie) => {
    [key, value] = cookie.split('=')

    if(key === name) {
      acc = value;
      return acc;
    }
    return acc;
  }, "");

  if(cookieValue.length === 0) {
    return undefined;
  }

  return cookieValue;
}

function retrieveBaseURL() {
  const cookies = document.cookie;
  const baseURL = getCookie("baseURL", cookies);

  if(baseURL === undefined) {
    console.dir("BASE_URL has not been set, using default URL");
    return 'http://localhost:5000/';
  }

  return baseURL
}

async function retrieveLatestAlert() {
  const BASE_URL = retrieveBaseURL();
  
  const route = "get_alert";
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
