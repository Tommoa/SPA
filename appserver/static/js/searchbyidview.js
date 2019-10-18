require([
  "/static/app/SPA/js/retrieveProfiles.js",
  "/static/app/SPA/js/modal.js",
  "splunkjs/mvc",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/textinputview",
  'splunkjs/mvc/tokenutils',
  "splunkjs/mvc/simplexml/ready!"
], function (ProfilesView, Modal, mvc, SearchManager, TextInputView, TokenUtils) {

  const tokens = mvc.Components.get('default');

  // Render text input for the student id input
  new TextInputView({
    id: 'txtNum',
    value: mvc.tokenSafe('$studentid$'),
    el: $('#studentid')
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
    search: mvc.tokenSafe("* is-ise cise_passed_authentications earliest=\"$earliest$\" latest=\"$latest$\" timeformat=\"%Y-%m-%d\"  \"User-Name\" | where like(UserName,\"$studentid$\")  | head 1 | table UserName" ),
  });

  // Show Modal
  $('#profilesView').on('click', function (event) {
    const identity = tokens.get('studentid');
    const toDate = tokens.get('earliest');
    const fromDate = tokens.get('latest');
    Modal.renderModal(identity, toDate, fromDate);
  });

});

