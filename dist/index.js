var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var isLoggedIn = false;
var authToken;
window.onload = () => {
    var sheetsApiObj = new sheetsApi;
    const authButton = document.getElementById("auth_button");
    const mainInterface = document.getElementById("main_interface");
    const postButton = document.getElementById("post_button");
    const saveButton = document.getElementById("save_button");
    const test = document.getElementById("test_here");
    //Save inputted spreadsheet settings to local storage
    saveButton.addEventListener('click', () => {
        let spreadsheetID = document.getElementById('spreadsheetID').value;
        let sheetID = document.getElementById('sheetID').value;
        sheetsApiObj.setSheetLocation(spreadsheetID, sheetID);
    });
    postButton.addEventListener('click', () => {
        sheetsApiObj.postData();
    });
    setLoginState();
    // Authentication button functionality
    authButton.addEventListener('click', () => {
        setLoginState();
        if (!isLoggedIn) {
            getSigninToken();
        }
        else {
            googleSignout();
        }
        setLoginState();
    });
    // Checks if user is logged in and sets button to correct text
    function setLoginState() {
        return __awaiter(this, void 0, void 0, function* () {
            chrome.identity.getAuthToken({ interactive: false }, () => {
                if (chrome.runtime.lastError) {
                    isLoggedIn = false;
                    authButton.textContent = "Sign in";
                    mainInterface.hidden = true;
                }
                else {
                    isLoggedIn = true;
                    authButton.textContent = "Sign out";
                    mainInterface.hidden = false;
                }
                chrome.runtime.reload;
            });
        });
    }
};
