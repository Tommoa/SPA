//  npm install -g qunit
//  qunit

require("amd-loader");
const helper = require("../appserver/static/js/helper.js")

QUnit.test("format date with valid date object", function(assert) {
  // months are indexed from 0..11
  const newDate = new Date(2020, 4, 10)

  const expected = "2020-05-10";

  const actual = helper.formatDateToString(newDate);

  assert.ok( expected === actual, "ok" );
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
    </div> `

  expected = expected.replace(/\n|\r| /g, "");

  assert.ok(expected === actual, "ok");
})

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

  let actual = helper.processResults(historyResults);
  actual = actual.trim();

  let expected = ' <div id = "MAC-address">03:120i:203i02:1021</div>'
  expected = expected.trim();

  assert.ok(expected === actual, "ok");
});

