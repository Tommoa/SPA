define(function (require, exports, module) {
  exports.splitString = function (name, stringList) {
    return splitString(name, stringList);
  }

  exports.formatData = function(data) {
    return formatData(data);
  }

  exports.processResults = function(historyResults) {
    return processResults(historyResults);
  }

  exports.showLoader = function(){
    return showLoader();
  }

});

function splitString(name, stringList, delimiter) {
  const splitStrings = stringList.split("; ");

  const stringValue = splitStrings.reduce((acc, string) => {
    [key, value] = string.split("=");

    if (key === name) {
      acc = value;
      return acc;
    }
    return acc;
  }, "");

  if (stringValue.length === 0) {
    return undefined;
  }

  return stringValue;
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
  const MACAddresses = resultArray.map(x => x[1]);
  const first_name = resultArray.map(x => x[2], y => y[0]);
  const last_name = resultArray.map(x => x[3], y => y[0]);
  const email = resultArray.map(x => x[4], y => y[0]);
  const phone_number = resultArray.map(x => x[5], y => y[0]);

  const history = MACAddresses.reduce((acc, x) => {
    const div = "<div id = \"MAC-address\">" + x + "</div>";
    return acc + div;
  }, ' ');

  return [history, first_name, last_name, email, phone_number];
}

function showLoader() {
  let name = document.getElementById('FirstName').innerHTML;

  if(name === '') {
    $('.loader').show();
    const loading = setInterval(function() {
      name = document.getElementById('FirstName').innerHTML;
      if(name !== '') {
        $(".loader").fadeOut("slow");
        clearInterval(loading);
      }
    }, 500);
  }
}
