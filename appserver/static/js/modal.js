define(function (require, exports, module) {
  var SearchManager = require("splunkjs/mvc/searchmanager");
  var mvc = require("splunkjs/mvc");
  
  return {
    renderModal: function (context) {
      let identity = context.find('#identity').text();
      identity = identity.split(":")[1].trim();

      $('#profile-modal').modal("show");
      $('#ID').html("&nbsp" + identity);

      var historySearch = new SearchManager({
        preview: true,
        cache: true,
        search: mvc.tokenSafe("* is-ise cise_passed_authentications \"User-Name\" | where like(UserName,\"$studentid$\") | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1) | table UserName MAC")
      });

      let historyResults = historySearch.data("results");

      historyResults.on("data", function () {
        const resultArray = historyResults.data().rows;
        const MACAddresses = resultArray.map(x => x[1])

        const html = MACAddresses.reduce((acc, x) => {
          const div = "<div id = \"MAC-address\">" + x + "</div>";
          return acc + div;
        }, " ");

        $('#history').html(html);
      });
    },
  }
});
