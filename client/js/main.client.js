// Client side javascript

// create client database subscriptions
Meteor.subscribe('fbAccessToken');

Meteor.startup(function () {

  // helper function to display the pic on the page
  Template.fb_pic.pic = function() {
    var userProfile;
    userProfile = Meteor.user().profile;
    if (userProfile) {
      return userProfile.picture;
    }
  };
});
