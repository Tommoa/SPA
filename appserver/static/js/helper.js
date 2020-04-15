define(function (require, exports, module) {
  exports.formatData = function(data) {
    return formatData(data);
  }

  exports.processResults = function(historyResults) {
    return processResults(historyResults);
  }
});

function formatData(data) {
  let profilesHTML = '';

  data.map(row => {
    const ID = row[0];

    const profileCard = 
    ` <div id=profile-container>
        <div id='identity'>
          ${ID}
        </div>
      </div> `
      
    profilesHTML += profileCard;
  });

  return profilesHTML;
}

function processResults(historyResults) {
  const resultArray = historyResults.data().rows;
  const MACAddresses = resultArray.map(x => x[1])

  const html = MACAddresses.reduce((acc, x) => {
    const div = "<div id = \"MAC-address\">" + x + "</div>";
    return acc + div;
  }, ' ');

  return html;
}
