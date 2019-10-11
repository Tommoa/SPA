require([
  "/static/app/SPA/js/baseclass.js",
  "splunkjs/mvc",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/textinputview",
  "splunkjs/mvc/simplexml/ready!"
], function (DemoView, mvc, SearchManager, TextInputView) {

  // Create a text input for the student id input
  var myTextBox = new TextInputView({
    id: "txtNum",
    value: mvc.tokenSafe("$studentid$"),
    el: $("#studentid")
  }).render()

  var fromDate = new TextInputView({
    id: "from",
    el: $("#from"),
    type: "date",
    value: mvc.tokenSafe("$fromdate$")
  }).render();

  var toDate = new TextInputView({
    id: "to",
    el: $("#to"),
    type: "date",
    value: mvc.tokenSafe("$toDate$")
  }).render();

  // Create a custom view
  var customView = new DemoView({
    id: "mycustomview",
    managerid: "mysearch",
    el: $("#mycustomview")
  }).render();

  // Search Engine
  var mysearch = new SearchManager({
    id: "mysearch",
    preview: true,
    cache: true,
    search: mvc.tokenSafe("* is-ise cise_passed_authentications \"User-Name\" | where like(UserName, \"$studentid$\") | eval MAC=mvindex(split(Acct_Session_Id, \"/\"), 1) | head 1 | table UserName MAC"),
  });

  // Show Modal
  $('#mycustomview').on('click', function (event) {
    let identity = $(this).find('#identity').text();
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

  });

});

