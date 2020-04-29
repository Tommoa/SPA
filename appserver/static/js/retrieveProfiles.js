define(function (require, exports, module) {
  const helper = require('/static/app/SPA/js/helper/helper.js');

  const SimpleSplunkView = require('splunkjs/mvc/simplesplunkview');
  const _ = require('underscore');

  const ProfilesView = SimpleSplunkView.extend({
    className: 'profilesview',
    options: {
      data: 'results'
    },

    // TODO - this needs to be refactored so it can be unit tested
    formatData: function (data) {
      const profilesHTML = helper.formatData(data);
      return profilesHTML;
    },

    createView: function () {
      return this;
    },

    updateView: function (viz, data) {
      this.$el.html(data);
    }
  });
  return ProfilesView;
});