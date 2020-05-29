//  npm install -g qunit
//  qunit

require("amd-loader");
const helper = require("../appserver/static/js/helper/helper.js");
const date = require("../appserver/static/js/date.js");

QUnit.test("return a formatted date given a valid date object", function(assert) {
    // months are indexed from 0..11
    const newDate = new Date(2020, 4, 10)

    const expected = "2020-05-10";

    const actual = date.formatDateToString(newDate);

    assert.ok(expected === actual, "ok");
});

QUnit.test("return the correct HTML of a profile-container for a valid dataset", function(assert) {
    const data = [
        ["2139232"],
        ["1210221"]
    ]

    let actual = helper.formatData(data);
    actual = actual.replace(/\n|\r| /g, "");

    let expected =
        ` <div id=profile-container>
      <div id='identity'>
        ${data[0]}
      </div>
    </div> 
    <div id=profile-container>
      <div id='identity'>
        ${data[1]}
      </div>
    </div> `;

    expected = expected.replace(/\n|\r| /g, "");

    assert.ok(expected === actual, "ok");
})

QUnit.test("return the correct string given a longer string to split", function(assert) {
    const string = "baseURL=http://127.0.0.1:5000/; splunkweb_csrf_token_8000=11572272911242863278; token_key=11572272911242863278; experience_id=cd698292-44c5-8e90-4337-7b89f938f974";
    const expected = "http://127.0.0.1:5000/";

    let actual = helper.splitString("baseURL", string);

    assert.ok(expected === actual, "ok");
});

QUnit.test("return the correct HTML for a valid list of MAC addresses", function(assert) {
    const historyResults = {
        data: () => {
            return {
                rows: [
                    ["21220339", "03:120i:203i02:1021"]
                ]
            }
        }
    };

    let [actual, , , , ] = helper.processResults(historyResults);
    actual = actual.trim();

    let expected = ' <div id = "MAC-address">03:120i:203i02:1021</div>'
    expected = expected.trim();

    assert.ok(expected === actual, "ok");
});

QUnit.test('return a HTML table given key-value data and headers', function(assert) {
    const payload = {
        "brute_force": {},
        "multi_logins_macs": {
            "00-E1-8C-76-5C-73": 46,
            "14-BD-61-9C-7E-39": 43,
            "2C-61-F6-33-5C-BC": 43
        },
        "num_alerts": {
            "24_hrs": 0
        },
        "num_alerts_per_cat": {
            "brute_force": 423,
            "multi_logins": 462
        },
        "user_threat_count": {
            "21150686": 46,
            "22430786": 43,
            "00031115": 43,
            "00060691": 43,
            "00078323": 44
        }
    };
    const headers = ["MAC Address", "Count"];
    const data = payload.multi_logins_macs;

    let actual = helper.buildHTMLTable(data, headers);

    let expected =`
        <table class='statistics-table'><tr><th> MAC Address </th><th> Count </th></tr>
            <tr>
                <td>00-E1-8C-76-5C-73</td>
                <td>46</td>
            </tr>

            <tr>
                <td>14-BD-61-9C-7E-39</td>
                <td>43</td>
            </tr>

            <tr>
                <td>2C-61-F6-33-5C-BC</td>
                <td>43</td>
            </tr>
        </table>`;

    var reg = new RegExp(/\s/g);
    expected = expected.replace(reg,'');
    actual = actual.replace(reg,'');

    assert.ok(expected === actual, 'ok');
});
