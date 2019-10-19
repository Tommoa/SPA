require([
        "splunkjs/mvc",
        "jquery",
        "splunkjs/mvc/tableview",
        "splunkjs/mvc/simpleform/input/text",
        "splunkjs/mvc/simpleform/input/dropdown",
        "splunkjs/mvc/simpleform/input/submit",
        "splunkjs/mvc/searchmanager",
        "splunkjs/mvc/simplexml/ready!"
    ],
    function(
        mvc,
        $,
        TableView,
        TextInput,
        DropdownInput,
        SubmitButton,
        SearchManager
    ) {

        //
        // VIEWS: FORM INPUTS
        //

        var domainName = new TextInput({
            "id": "domainName",
            "value": mvc.tokenSafe("$domainName$"),
            "el": $('#domainName')
        }, {tokens: true}).render();

        var ipAddress = new TextInput({
            "id": "ipAddress",
            "value": mvc.tokenSafe("$ipAddress$"),
            "el": $('#ipAddress')
        }, {tokens: true}).render();

        var severity = new DropdownInput({
            "id": "severity",
            "choices": [
                {"value": "1", "label": "1"},
                {"value": "2", "label": "2"},
                {"value": "3", "label": "3"},
                {"value": "4", "label": "4"},
                {"value": "5", "label": "5"}
            ],
            "default": "1",
            "value": mvc.tokenSafe("$severity$"),
            "el": $('#severity')
        }, {tokens: true}).render();

        //
        // SEARCH MANAGERS
        //

        var searchBlockList = new SearchManager({
            "id": "searchBlockList",
            "earliest_time": "-24h@h",
            "latest_time": "now",
            "search": " | inputlookup myblocklist_lookup | eval  KeyID = _key | table KeyID, DomainName, IpAddress, Severity",
            "preview": true
        }, {tokens: true});

        //
        // DISPLAY TABLE
        //

        var element1 = new TableView({
            "id": "element1",
            "drilldown": "none",
            "managerid": "searchBlockList",
            "el": $('#display')
        }, {tokens: true}).render();

        //
        // SERVICE OBJECT
        //

        // Create a service object using the Splunk SDK for JavaScript
        // to send REST requests
        var service = mvc.createService({ owner: "nobody" });

        //
        // SUBMIT FORM DATA
        //

        var submit = new SubmitButton({
            id: 'submit',
            el: $('#submit_btn')
        }, {tokens: true}).render();

        submit.on("submit", function() {
            // When the Submit button is clicked, get all the form fields by accessing token values
            var tokens = mvc.Components.get("default");
            var form_dom = tokens.get("domainName");
            var form_ip = tokens.get("ipAddress");
            var form_sev = tokens.get("severity");

            // Create a dictionary to store the field names and values
            var record = {
                "DomainName": form_dom,
                "IpAddress": form_ip,
                "Severity": form_sev
            };

            // Use the request method to send a REST POST request
            // to the storage/collections/data/{collection}/ endpoint
            service.request(
                    "storage/collections/data/myblocklist/",
                    "POST",
                    null,
                    null,
                    JSON.stringify(record), {
                        "Content-Type": "application/json"
                    },
                    null)
                .done(function() {
                    // Run the search again to update the table
                    searchBlockList.startSearch();

                    // Clear the form fields
                    $("#formBlockList input[type=text]").val("");
                    tokens.set("domainName", "");
                    tokens.set("ipAddress", "");
                });
        });

    });