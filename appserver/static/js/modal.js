define(function (require, exports, module) {
  const SearchManager = require('splunkjs/mvc/searchmanager');
  const mvc = require('splunkjs/mvc');
  const helper = require('/static/app/SPA/js/helper.js');

  return {
    renderModal: function (identity, toDate, fromDate) {
      $('#profile-modal').modal('show');
      $('#ID').html('&nbsp' + identity);

      const searchString = `
        * is-ise cise_passed_authentications 
        earliest="${fromDate}" latest="${toDate}" timeformat=\"%Y-%m-%d\" "User-Name" 
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
      
      historyResults.on('data', () => {
        const html = helper.processResults(historyResults)
        $('#history').html(html);
      });
    },
  }
});
