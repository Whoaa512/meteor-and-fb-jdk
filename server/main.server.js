// Server side javascript

Meteor.startup(function () {

  // publish the Facebook access token for the current logged in user
  Meteor.publish("fbAccessToken", function() {
    return Meteor.users.find(this.userId, {
      fields: {
        "services.facebook.accessToken": 1
      }
    });
  });

});
