require([
  "/static/app/SPA/js/retrieveProfiles.js",
  "/static/app/SPA/js/modal.js",
  "splunkjs/mvc",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/textinputview",
  "splunkjs/mvc/simplexml/ready!"
], function (ProfilesView, Modal, mvc, SearchManager, TextInputView) {

  // Render text input for the student id input
  new TextInputView({
    id: "txtNum",
    value: mvc.tokenSafe("$studentid$"),
    el: $("#studentid")
  }).render()

  // Render date input for from date
  new TextInputView({
    id: "from",
    el: $("#from"),
    type: "date",
    value: mvc.tokenSafe("$fromdate$")
  }).render();

  // Render date input for to date
  new TextInputView({
    id: "to",
    el: $("#to"),
    type: "date",
    value: mvc.tokenSafe("$toDate$")
  }).render();

  // Create view which contains IDs
  new ProfilesView({
    id: "ProfilesView",
    managerid: "searchForProfile",
    el: $("#profilesView")
  }).render();

  // Search Engine
  new SearchManager({
    id: "searchForProfile",
    preview: true,
    cache: true,
    search: mvc.tokenSafe("* is-ise cise_passed_authentications \"User-Name\" | where like(UserName, \"$studentid$\") | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1) | head 1 | table UserName MAC"),
  });

  // Show Modal
  $('#profilesView').on('click', function (event) {
    Modal.renderModal($(this));
  });

});

