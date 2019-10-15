define(function (require, exports, module) {
  const SearchManager = require("splunkjs/mvc/searchmanager");
  const mvc = require("splunkjs/mvc");
  
  return {
    renderModal: function (context) {
      let identity = context.find('#identity').text();
      identity = retrieveIdentityString(identity);

      $('#profile-modal').modal("show");
      $('#ID').html("&nbsp" + identity);

      const historySearch = new SearchManager({
        preview: true,
        cache: true,
        search: mvc.tokenSafe("* is-ise cise_passed_authentications \"User-Name\" | where like(UserName,\"$studentid$\") | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1) | table UserName MAC")
      });

      const historyResults = historySearch.data("results");
      processResults(historyResults);
    },
  }
});

// HELPER FUNCTIONS

function retrieveIdentityString(identityHTML) {
  return identityHTML.split(":")[1].trim();
}

function processResults(historyResults) {
  historyResults.on("data", function () {
    const resultArray = historyResults.data().rows;
    const MACAddresses = resultArray.map(x => x[1])

    const html = MACAddresses.reduce((acc, x) => {
      const div = "<div id = \"MAC-address\">" + x + "</div>";
      return acc + div;
    }, " ");
    
    $('#history').html(html);
  });
}