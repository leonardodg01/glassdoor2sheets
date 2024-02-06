console.log("oauth.ts running");
// Signin button authentication
function googleSignin() {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        let init = {
            method: 'GET',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'contentType': 'json'
        };
    });
}
// Signout authentication
function googleSignout() {
    var options = {
        'interactive': false,
        'url': 'https://localhost:44344/Account/Logout'
    };
    chrome.identity.launchWebAuthFlow(options, function (redirectUri) { });
    options = {
        'interactive': false,
        'url': 'https://accounts.google.com/logout'
    };
    chrome.identity.launchWebAuthFlow(options, function (redirectUri) { });
}
