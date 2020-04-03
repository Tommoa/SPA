define(function (require, exports, module) {

  const SimpleSplunkView = require('splunkjs/mvc/simplesplunkview');
  const _ = require('underscore');

  const ProfilesView = SimpleSplunkView.extend({
    className: 'profilesview',
    options: {
      data: 'results'
    },

    formatData: function (data) {
      let profilesHTML = '';

      _.each(data, function (row, index) {
        const ID = row[0];

        const profileCard = 
        ` <div id=profile-container>
            <div id='identity'>
              ${ID}
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
  return ProfilesView;
});