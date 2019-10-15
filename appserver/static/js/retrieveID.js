define(function (require, exports, module) {

  var SimpleSplunkView = require('splunkjs/mvc/simplesplunkview');
  var _ = require("underscore");

  var DemoView = SimpleSplunkView.extend({

    className: "demoview",
    options: {
      data: "results"
    },

    formatData: function (data) {
      var profilesHTML = "";

      _.each(data, function (row, index) {
        const ID = row[0];
        
        const profileCard = 
        ` <div id=profile-container>
            <div id="identity">
              <b> Identity : </b> ${ID}
            </div>
          </div> `
        profilesHTML += profileCard;
      });

      return profilesHTML;
    },

    createView: function () {
      return this;
    },

    updateView: function (viz, data) {
      this.$el.html(data);
    }
  });
  return DemoView;
});