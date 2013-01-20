// Client side javascript

// create client database subscriptions
Meteor.subscribe('fbAccessToken');

Meteor.startup(function () {

  // helper function to display the pic on the page
  Template.fb_pic.pic = function() {
    var userProfile;
    userProfile = Meteor.user().profile;
    // logic to handle logged out state
    if (userProfile) {
      return userProfile.picture;
    }
  };
});

Template.feed.events({
  'click .post': function(e) {
    e.preventDefault();
    FB.ui({
      method: 'feed',
      name: 'Facebook Dialogs',
      link: 'http://fbrell.com/',
      picture: 'http://fbrell.com/f8.jpg',
      caption: 'Reference Documentation',
      description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    }, function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
    });
  }
});

var fbSdkLoader = function() {
  if(!Session.get("is Facebook JDK loaded?")) { // Load Facebook JDK only once.
    Session.set("is Facebook JDK loaded?", true);

    // See Facebook JavaScript JDK docs at: https://developers.facebook.com/docs/reference/javascript/
    window.fbAsyncInit = function() {
      // Init the FB JS SDK
      var initConfig = {
        appId: 'YOUR_APP_ID',
        // App ID from the App Dashboard

        channelUrl: Meteor.absoluteUrl("channel.html"),
        // channel url for FB

        status: false,
        // check the login status upon init?

        cookie: false,
        // set sessions cookies to allow your server to access the session?

        xfbml: false // parse XFBML tags on this page?
      };

      FB.init(initConfig);
    };

    // Load the SDK's source Asynchronously
    (function(d, debug) {
      var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
      if(d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
      ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));
  }
};

fbSdkLoader();