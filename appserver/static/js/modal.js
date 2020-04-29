define(function (require, exports, module) {
  const SearchManager = require('splunkjs/mvc/searchmanager');
  const mvc = require('splunkjs/mvc');
  const helper = require('/static/app/SPA/js/helper/helper.js');

  return {
    renderModal: function (identity, toDate, fromDate) {
      $('#profile-modal').modal('show');
      $('#ID').html('&nbsp' + identity);

      const searchString = `
        * is-ise cise_passed_authentications
        earliest="${fromDate}" latest="${toDate}" timeformat=\"%Y-%m-%d\" "User-Name"
        | where like(UserName, "${identity}")
        | eval MAC=mvindex(split(Acct_Session_Id, "/"), 1)
        | dedup MAC
        | lookup mycontacts_lookup _key as UserName OUTPUT FirstName, LastName, Email, PhoneNumber
        | table UserName, MAC, FirstName, LastName, Email, PhoneNumber
      `;

      const historySearch = new SearchManager({
        preview: true,
        cache: true,
        search: mvc.tokenSafe(searchString)
      });

      const historyResults = historySearch.data('results');

      historyResults.on('data', () => {
        const [history, first_name, last_name, email, phone_number] = helper.processResults(historyResults)
        $('#history').html(history);
        $('#FirstName').html('First Name: ' + first_name);
        $('#LastName').html('Last Name: ' + last_name);
        $('#Email').html('Email Address: ' + email);
        $('#PhoneNumber').html('Phone Number: ' + phone_number);
      });
    },
  }
});
