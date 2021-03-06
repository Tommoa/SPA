require([
  "/static/app/SPA/js/retrieveProfiles.js",
  "/static/app/SPA/js/modal.js",
  "/static/app/SPA/js/date.js",
  "/static/app/SPA/js/api/api.js",
  "/static/app/SPA/js/helper/helper.js",
  "splunkjs/mvc",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/textinputview",
  'splunkjs/mvc/tokenutils',
  "splunkjs/mvc/simplexml/ready!"
], function (ProfilesView, Modal, Date, API, helper, mvc, SearchManager, TextInputView, TokenUtils) {

  const tokens = mvc.Components.get('default');
  const [todate, fromdate] = Date.getToFromDate();

  tokens.set("earliest", fromdate);
  tokens.set("latest", todate);

  // Render text input for the mac address input
  new TextInputView({
    id: 'txtNum',
    value: mvc.tokenSafe('$MACaddress$'),
    el: $('#MACaddress')
  }).render()

  // Render date input for from date
  new TextInputView({
    id: 'from',
    el: $('#from'),
    type: 'date',
    value: mvc.tokenSafe('$earliest$'),
  }).render();

  // Render date input for to date
  new TextInputView({
    id: 'to',
    el: $('#to'),
    type: 'date',
    value: mvc.tokenSafe('$latest$'),
  }).render();

  // Create view which contains IDs
  new ProfilesView({
    id: 'ProfilesView',
    managerid: 'searchForProfile',
    el: $('#profilesView')
  }).render();

  // Search Engine
  new SearchManager({
    id: 'searchForProfile',
    preview: true,
    cache: true,
    search: mvc.tokenSafe("* is-ise cise_passed_authentications earliest=\"$earliest$\" latest=\"$latest$\" timeformat=\"%Y-%m-%d\" \"User-Name\" | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1)| where like(MAC,\"$MACaddress$\") | head 1 | table UserName MAC"),
  });

  // start API
  API.getLatestAlert();

  // Show Modal
  $('#profilesView').on('click', function (event) {
    let identity = $(this).find('#identity').text();
    identity = identity.replace(/\s/g,'');

    const toDate = tokens.get('latest');
    const fromDate = tokens.get('earliest');

    Modal.renderModal(identity, toDate, fromDate);
    helper.showLoader();

  });
});
