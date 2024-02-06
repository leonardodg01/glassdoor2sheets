console.log("sheetsapi.ts running");
class sheetsApi {
    constructor() {
        this.secrets = null;
        this.values = null; //Values appended to spreadsheet
    }
    // Get secrets from JSON file
    getSecrets() {
        // Fetch secrets from json file
        fetch('./secrets.json')
            .then((response) => response.json())
            .then((json) => this.secrets = json);
    }
    //POST data to specified spreadsheet
    postData() {
        fetch("https://sheets.googleapis.com/v4/spreadsheets/" + this.secrets.sheetID + "/values/" + this.secrets.sheetName
            + "!A1:A1:append?valueInputOption=USER_ENTERED?key=" + this.secrets.apikey, {
            method: "POST",
            body: JSON.stringify({
                majorDimension: "ROWS",
                values: [["Jobname", "jobjob", "woah"]]
            }),
            headers: {
                "Content-type": "application/json",
                "Connection": "keep-alive",
                "Accept": "*/*",
            }
        });
    }
}
