class sheetsApi{
    secrets;
    values; //Values appended to spreadsheet
    
    async setSheetLocation(sheetID, sheetName){
        chrome.storage.local.set({'sheetID': sheetID, 'sheetName': sheetName}, ()=> {
            console.log('Saved sheet location data');
          });
    }

    async getSheetID(){
        return await chrome.storage.local.get(['sheetID']);
    }
    
    async getSheetName(){
        return await chrome.storage.local.get(['sheetName']);
    }

    //POST data to specified spreadsheet
    async postData(){
        console.log(this.secrets)
        
        let response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/" + 
        await this.getSheetID().then((result)=>{return result.sheetID}) + "/values/" + 
        await this.getSheetName().then((result)=>{return result.sheetName}) + "!A1:A1:append?valueInputOption=USER_ENTERED", {
            method: "POST",
            body: JSON.stringify({
                majorDimension: "ROWS",
                values: [["Jobname", "jobjob", "woah"]]
            }),
            headers: {
                "Content-type": "application/json",
                "Connection": "keep-alive",
                "Accept": "*/*",    },
        });
    }
}