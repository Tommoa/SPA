define(function (require, exports, module) {
  exports.formatDateToString = function (date) {
    return formatDateToString(date);
  };

  exports.formatData = function(data) {
    return formatData(data);
  }

  exports.processResults = function(historyResults) {
    return processResults(historyResults);
  }
});

function formatDateToString(date) {
  // 01, 02, 03, ... 29, 30, 31
  const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  // 01, 02, 03, ... 10, 11, 12
  const MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  // 1970, 1971, ... 2015, 2016, ...
  const yyyy = date.getFullYear();

  // create the format you want
  return yyyy + "-" + MM + "-" + dd;
}

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
