// Server side javascript

Meteor.startup(function () {

  // serve channel.html file programmatically
  var connect;
  connect = __meteor_bootstrap__.require("connect");

  __meteor_bootstrap__.app.use(connect.query()).use(function(req, res, next) {
    // Need to create a Fiber since we're using synchronous http
    // calls and nothing else is wrapping this in a fiber
    // automatically
    return Fiber(function() {
      if (req.url === "/channel.html") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end('<script src="//connect.facebook.net/en_US/all.js"></script>');
      } else {
        // if not an channel.html request, pass to next middleware.
        return next();
      }
    }).run();
  });

  // publish the Facebook access token for the current logged in user
  Meteor.publish("fbAccessToken", function() {
    return Meteor.users.find(this.userId, {
      fields: {
        "services.facebook.accessToken": 1
      }
    });
  });

  // during new account creation get user picture from facebook and save it on user object
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
      options.profile.picture = getFbPicture(user.services.facebook.accessToken);
      // We still want the default 'profile' behavior.
      user.profile = options.profile;
    }
    return user;
  });
});

// make async call to grab the picture from facebook
var getFbPicture = function(accessToken) {
  var result;
  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: accessToken,
      fields: 'picture'
    }
  });
  if (result.error) {
    throw result.error;
  }

  // save the picture's url instead of the picture object we are given from facebook
  return result.data.picture.data.url;
};

