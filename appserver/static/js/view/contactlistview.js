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
        // SEARCH MANAGERS
        //

        var searchContactList = new SearchManager({
            "id": "searchContactList",
            "search": " | inputlookup mycontacts_lookup | eval  ID = _key | table ID, LastName, FirstName, Email, PhoneNumber",
            "preview": true
        }, { tokens: true });

        var addCsvContactList = new SearchManager({
            "id": "addCsvContactList",
            "autostart": "false",
            "search": `source="*contacts_csv*"
                        | dedup id
                        | rename first_name as FirstName, last_name as LastName, email as Email, phone_number as PhoneNumber
                        | table id, LastName, FirstName, Email, PhoneNumber
                        | outputlookup mycontacts_lookup append=T key_field=id`
        });


        //
        // DISPLAY TABLE
        //

        var element1 = new TableView({
            "id": "element1",
            "drilldown": "none",
            "managerid": "searchContactList",
            "el": $('#display')
        }, { tokens: true }).render();

        //
        // SERVICE OBJECT
        //

        // Create a service object using the Splunk SDK for JavaScript
        // to send REST requests
        var service = mvc.createService({ owner: "nobody" });

        //
        // SUBMIT FORM DATA
        //

        $(".addCsvButton").on("click", function() {
            var ok = confirm("Add data from CSV folder?");
            if (ok) {
                addCsvContactList.startSearch();
                alert('Data added!');
                searchContactList.startSearch();
            }
        });

    });
