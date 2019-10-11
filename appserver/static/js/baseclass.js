define(function (require, exports, module) {

  var SimpleSplunkView = require('splunkjs/mvc/simplesplunkview');
  var _ = require("underscore");

  // Define the custom view class
  var DemoView = SimpleSplunkView.extend({

    className: "demoview",

    // Change the value of the "data" property
    options: {
      data: "results"
    },

    // Override this method to format your data in a specific way
    // Our view expects HTML, so reformat the results array accordingly
    formatData: function (data) {
      // Display the data object to the console
      var mydatastring = "";

      // Format each row of results as an HTML list
      _.each(data, function (row, index) {
        const ID = row[0];
        
        const profileCard = 
        ` <div id=profile-container>
            <div id="identity">
              <b> Identity : </b> ${ID}
            </div>
          </div> `
        mydatastring = mydatastring + profileCard;
      });

      // Wrap the string with the unordered list tag
      // mydatastring = "<ul>" + mydatastring + "</ul>";
      return mydatastring;
    },

    // Override this method to configure your view
    // This function must return a handle to the view, which is then passed
    // to the updateView method as the first argument. Because there is no
    // visualization, just return 'this'
    createView: function () {
      return this;
    },

    // Override this method to put the Splunk data into the view
    updateView: function (viz, data) {
      // Display the reformatted data object to the console
      this.$el.html(data);
    }
  });
  return DemoView;
});