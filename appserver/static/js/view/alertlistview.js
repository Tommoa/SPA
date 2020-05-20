require([
  "/static/app/SPA/js/api/polling.js",
], function(API) {
  API.retrieveAlerts().then(alerts => {

    let alertsTable = `
      <table class="alerts-table">
        <tr>
          <th> Threat Level </th>
          <th> Timestamp </th>
          <th> User </th>
          <th> Alert </th>
        </tr>
    `;

    alerts.map(alert => {
      const alertDescription = alert.alert;
      const user = alert.user;
      const timestamp = alert.timestamp;
      const threatLevel = alert["threat level"];

      let threatLevelStyling = ''
      if(threatLevel == "medium") {
        threatLevelStyling="color: #f1b300";
      } else if(threatLevel == "high") {
        threatLevelStyling="color: #dc4e41";
      }

      let html = `
        <tr>
          <td style="${threatLevelStyling}"> <b> ${threatLevel} </b> </td>
          <td> ${timestamp} </td>
          <td> ${user} </td>
          <td> ${alertDescription} </td>
        </tr>
      `;

      alertsTable += html;
    })

    alertsTable += '</table>';
    
    $(".alerts-list").html(alertsTable);
  });
});
