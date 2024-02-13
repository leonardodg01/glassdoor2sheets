class sheetsApi{
    secrets;
    values; //Values appended to spreadsheet
    
    async setSheetLocation(spreadsheetID, sheetID){
        chrome.storage.local.set({'spreadsheetID': spreadsheetID, 'sheetID': sheetID}, ()=> {
            console.log('Saved sheet location data');
          });
    }

    async getSpreadsheetID(){
        return await chrome.storage.local.get(['spreadsheetID']);
    }
    
    async getSheetID(){
        return await chrome.storage.local.get(['sheetID']);
    }

    async getAuthToken(){
        return await chrome.storage.local.get(['token']);
    }

    //POST data to specified spreadsheet
    async postData(){
        let response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/" + 
        await this.getSpreadsheetID().then((result)=>{return result.spreadsheetID}) + "/values/" + 
        await this.getSheetID().then((result)=>{return result.sheetID}) + "!A1:A1:append?valueInputOption=USER_ENTERED", {
            method: "POST",
            body: JSON.stringify({
                majorDimension: "ROWS",
                values: [["Jobname", "jobjob", "woah"]]
            }),
            headers: {
                Authorization: 'Bearer ' + await this.getAuthToken().then((result)=>{return result.token}),
                "Content-type": "application/json",
                "Connection": "keep-alive",
                "Accept": "*/*",    },
        });
    }
}