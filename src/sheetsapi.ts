let secrets;
let values; //Values appended to spreadsheet

window.onload = ()=>{
    
    
    function getSecrets(){
        // Fetch secrets from json file
        fetch('./secrets.json')
        .then((response) => response.json())
        .then((json) => secrets=json);
    }

    function postData(){
    fetch("https://sheets.googleapis.com/v4/spreadsheets/" + secrets.sheetID + "/values/" + secrets.sheetName + "!A1:A1:append?valueInputOption=USER_ENTERED?key="+ secrets.apikey, {
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
};