
// DEPENDENCIES
const fs = require('fs');
const csv = require('csv-parser');
const { parse } = require('csv-parse');
const { Octokit } = require("@octokit/core");
const { createPullRequest } = require("octokit-plugin-create-pull-request");
const { version } = require('os');
const { captureRejectionSymbol } = require('events');
const json2csv = require('json2csv').parse;
const csvwriter = require('csv-writer');


//FETCHING INPUT 
var inputString = "myawesometool -i input.csv axios@0.23.0";
//var inputString = "myawesometool -update -i input.csv axios@0.23.0";

var inputArr = inputString.split(" ");
try{
    if(inputArr[1]!="-update")
    {
        var update = false;
        var inputCSV = inputArr[2];
        var inputDependency = inputArr[3].split("@")[0];
        var inputVersion = inputArr[3].split("@")[1];
    }
    else if(inputArr[1]=="-update")
    {
        var update = true;
        var inputCSV = inputArr[3];
        var inputDependency = inputArr[4].split("@")[0];
        var inputVersion = inputArr[4].split("@")[1];
    }
}


catch(Exception ){
    console.log("Enter a valid input command");
}



// READING THE CSV FILE
var data = fs.readFileSync(inputCSV, "utf8");
data = data.split("\r\n"); // SPLIT ROWS
for (let i in data) { // SPLIT COLUMNS
  data[i] = data[i].split(",");
}
data = arrayToJSONObject(data);

var result; // contains output for version_satisfied

// For loop ordering is random T_T cuz the loop skips till the end of then() and gets executed while still waiting for async 
for(let i=0;i<data.length;i++)   
{
    data = data.filter(obj => obj.repo !== undefined);              // removing the null entries
    data = data.filter(obj => obj.name !== '');  

    var url = data[i].repo;

    getUrlInfo(url)
        .then((response) => 
        { 
            // EXTRACTING THE VERSION
            let str = ((Buffer.from(response.content, 'base64')).toString());
            let jsonn = JSON.parse(str);
            let dependencies = jsonn.dependencies;
            let version = dependencies[inputDependency];
            version = version.replace('~', '').replace('^','');

    
            if(checkVersion(inputVersion, version)==-1)
                result= "false" ;
            else 
                result = "true" ;
            output = []
            output = data[i];
            output['version'] = version;
            output['version_satisfied'] = result;
            data[i]['version_satisfied'] = result;

        if(result=="false")
        {
            const fs = require('fs');
            
            var jsonData = jsonn;
            jsonData.dependencies[inputDependency] = inputVersion; 
            
            // // parse json
                // var jsonObj = JSON.parse(jsonData);
                // console.log(jsonObj);
            
            // stringify JSON Object
            var jsonContent = JSON.stringify(jsonData);
            
            fs.writeFile("output"+i+".json", jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
            
                console.log("JSON file has been saved.");
            });
        }

            



            
            // // WRITING TO CSV FILE IF NON_UPDATE COMMAND
            // if(update==true)
            // {
            //     const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            //     const csvWriter = createCsvWriter({       
            //         path: 'output.csv',
            //         'append': true,
            //         header: [
            //             {id: 'name', title: 'name'},
            //             {id: 'repo', title: 'repo'},
            //             {id: 'version', title: 'version'},
            //             {id: 'version_satisfied', title: 'version_satisfied'},
            //             {id: 'update_pr', title:'update_pr'}
            //         ]
            //     });
            //     csvWriter.writeRecords(new Array(data[i]))       // returns a promise
            //         .then(() => {
            //             console.log('Data has been written to output.csv');
            //         });       
            // }
        
        })
    
    }


// HELPER FUNCTION DEFINITIONS ............
// FUNCTION TO CONVERT ARRAY TO JSON
function arrayToJSONObject (arr){
    var keys = arr[0];
    var newArr = arr.slice(1, arr.length);
    var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
    for (var i=0; i<data.length; i++) {
            var d = data[i],
                    o = {};
            for (var j=0; j<l; j++)
                    o[cols[j]] = d[j];
            formatted.push(o);
    }
    return formatted;
}

// FUNCTION TO GET THE REPO URL DETAILS LIKE OWNER etc. FROM REPO URL
async function getUrlInfo(url) {
    const octokit = new Octokit({
        auth: "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"
      })
      let x = url.toString().slice(19).split("/");
      var response =  await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: x[0],
        repo: x[1],
        path: 'package.json'
      });
    return response.data;
}

// FUNCTION TO CHECK IF THE VERSION REQUIRED IS GREATER OR LESSER
function checkVersion(v1, v2){
    v1 = v1.toString();
    v2 = v2.toString()
    let v1Arr = v1.split(".");
    let v2Arr = v2.split(".");
    let minLen = Math.min(v1.length,v2.length)
    for(i=0;i<minLen;i++){
        v1Arr[i] = parseInt(v1Arr[i]);
        v2Arr[i] = parseInt(v2Arr[i]);
        if(v1Arr[i]>v2Arr[i])
            return -1;
        if(v2Arr[i]>v1Arr[i])
            return 1;
    }
    return 0;
}

// FUNCTION TO EXTRACT VERSION FROM PACKAGE.JSON FILE
function getVersionFromPackage(responseData)
{
    let str = ((Buffer.from(response.content, 'base64')).toString());
    let json = JSON.parse(str);
    let dependencies = json.dependencies;
    let version = dependencies[inputDependency];
    version = version.replace('~', '').replace('^','');


    if(checkVersion(inputVersion, version)==-1)
        result.push("false") ;
    else 
        result.push("true") ;
}


