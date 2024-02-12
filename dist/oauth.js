var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("oauth.ts running");
// Signin button authentication
function getSigninToken() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield chrome.identity.getAuthToken({ interactive: true }, function (token) {
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
