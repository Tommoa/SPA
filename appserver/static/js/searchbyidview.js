require([
  "/static/app/SPA/js/retrieveID.js",
  "/static/app/SPA/js/modal.js",
  "splunkjs/mvc",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/textinputview",
  "splunkjs/mvc/simplexml/ready!"
], function (IDView, Modal, mvc, SearchManager, TextInputView) {

  // render text input for the student id input
  var myTextBox = new TextInputView({
    id: "txtNum",
    value: mvc.tokenSafe("$studentid$"),
    el: $("#studentid")
  }).render()

  // render date input for from date
  var fromDate = new TextInputView({
    id: "from",
    el: $("#from"),
    type: "date",
    value: mvc.tokenSafe("$fromdate$")
  }).render();

  // render date input for to date
  var toDate = new TextInputView({
    id: "to",
    el: $("#to"),
    type: "date",
    value: mvc.tokenSafe("$toDate$")
  }).render();

  // Create view which contains IDs
  var ID = new IDView({
    id: "IDView",
    managerid: "searchForID",
    el: $("#IDView")
  }).render();

  // Search Engine
  var search = new SearchManager({
    id: "searchForID",
    preview: true,
    cache: true,
    search: mvc.tokenSafe("* is-ise cise_passed_authentications \"User-Name\" | where like(UserName, \"$studentid$\") | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1) | head 1 | table UserName MAC"),
  });

  // Show Modal
  $('#IDView').on('click', function (event) {
    Modal.renderModal($(this));
  });

});

