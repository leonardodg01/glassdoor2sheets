var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class sheetsApi {
    setSheetLocation(spreadsheetID, sheetID) {
        return __awaiter(this, void 0, void 0, function* () {
            chrome.storage.local.set({ 'spreadsheetID': spreadsheetID, 'sheetID': sheetID }, () => {
                console.log('Saved sheet location data');
            });
        });
    }
    getSpreadsheetID() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome.storage.local.get(['spreadsheetID']);
        });
    }
    getSheetID() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome.storage.local.get(['sheetID']);
        });
    }
    getAuthToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome.storage.local.get(['token']);
        });
    }
    //POST data to specified spreadsheet
    postData() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("https://sheets.googleapis.com/v4/spreadsheets/" +
                (yield this.getSpreadsheetID().then((result) => { return result.spreadsheetID; })) + "/values/" +
                (yield this.getSheetID().then((result) => { return result.sheetID; })) + "!A1:A1:append?valueInputOption=USER_ENTERED", {
                method: "POST",
                body: JSON.stringify({
                    majorDimension: "ROWS",
                    values: [["Jobname", "jobjob", "woah"]]
                }),
                headers: {
                    Authorization: 'Bearer ' + (yield this.getAuthToken().then((result) => { return result.token; })),
                    "Content-type": "application/json",
                    "Connection": "keep-alive",
                    "Accept": "*/*",
                },
            });
        });
    }
}
