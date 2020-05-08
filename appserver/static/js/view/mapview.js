require([
  "async!http://maps.google.com/maps/api/js?key=AIzaSyBeVnW-T7YWboI8-nPfPbx-eTp3ssb8i_4&libraries=visualization",
  "/static/app/SPA/js/api/polling.js",
], function(_, API) {

  API.retrieveHeatmapData().then(dataPoints => {
    const heatmapData = buildHeatmapData(dataPoints);

    const UWACoords = { lat: -31.9801, lng: 115.8179 };
    const defaultZoom = 16;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: UWACoords,
      zoom: defaultZoom,
    });

    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 40,
    });

    heatmap.setMap(map);

    // outdated logic
    const countdown = setInterval(() => {
      const html = 'Data is outdated - please refresh your window.';
      $('#outdated').html(html);
      clearInterval(countdown);
    }, 900000);
  });

  function buildHeatmapData(dataPoints) {
    const heatmapData = dataPoints.map((point) => {
      lat = point.lat;
      lon = point.lon;

      return new google.maps.LatLng(lat, lon);
    });

    return heatmapData;
  }
});
