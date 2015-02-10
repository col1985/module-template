var $fh = require('fh-mbaas-api');

module.exports = {
  auth: init
};

// {
//   "policyId": "My LDAP Auth Policy", // name of Auth policy to use - see Auth Policies Administration for details on how to configure an Auth Policy
//   "clientToken": "myAppId", // Your App ID
//   "endRedirectUrl": window.location.href, // The URL to return to after authentication. Optional
//   "params": { // the parameters associated with the requested Auth Policy - see below for full details.
//     "userId": "joe@bloggs.com", // LDAP or Platform username
//     "password": "password" // LDAP or Platform password
// }

function init(opts, cb) {

  // LDAP or Platform User Example
  $fh.auth(opts, function (res) {
    // Authentication successful - store sessionToken in variable
    var sessionToken = res.sessionToken; // The platform session identifier
    var authResponse = res.authResponse; // The authetication information returned from the authetication service.
    // This may include things such as validated email address,
    // OAuth token or other response data from the authentication service
  }, function (msg, err) {
    var errorMsg = err.message;
    /* Possible errors:
      unknown_policyId - The policyId provided did not match any defined policy. Check the Auth Policies defined. See Auth Policies Administration
      user_not_found - The Auth Policy associated with the policyId provided has been set up to require that all users authenticating exist on the platform, but this user does not exists.
      user_not_approved - - The Auth Policy associated with the policyId provided has been set up to require that all users authenticating are in a list of approved users, but this user is not in that list.
      user_disabled - The user has been disabled from logging in.
      user_purge_data - The user has been flagged for data purge and all local data should be deleted.
      device_disabled - The device has been disabled. No user or apps can log in from the requesting device.
      device_purge_data - The device has been flagged for data purge and all local data should be deleted.
    */
    if (errorMsg == "user_purge_data" || errorMsg = "device_purge_data") {
      // User or device has been black listed from administration console and all local data should be wiped
    } else {
      alert("Authentication failed - " + errorMsg);
    }
  });
}
