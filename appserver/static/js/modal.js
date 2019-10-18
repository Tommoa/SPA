define(function (require, exports, module) {
  const SearchManager = require('splunkjs/mvc/searchmanager');
  const mvc = require('splunkjs/mvc');
  
  return {
    renderModal: function (identity, toDate, fromDate) {
      $('#profile-modal').modal('show');
      $('#ID').html('&nbsp' + identity);

      const searchString = `
        * is-ise cise_passed_authentications 
        earliest="${toDate}" latest="${fromDate}" timeformat=\"%Y-%m-%d\" "User-Name" 
        | where like(UserName, "${identity}") 
        | eval MAC=mvindex(split(Acct_Session_Id, "/"), 1) 
        | table UserName MAC
      `;

      const historySearch = new SearchManager({
        preview: true,
        cache: true,
        search: mvc.tokenSafe(searchString)
      });

      const historyResults = historySearch.data('results');
      processResults(historyResults);
    },
  }
});

// HELPER FUNCTIONS
function processResults(historyResults) {
  historyResults.on('data', function () {
    const resultArray = historyResults.data().rows;
    const MACAddresses = resultArray.map(x => x[1])

    const html = MACAddresses.reduce((acc, x) => {
      const div = "<div id = \"MAC-address\">" + x + "</div>";
      return acc + div;
    }, ' ');
    
    $('#history').html(html);
  });
}