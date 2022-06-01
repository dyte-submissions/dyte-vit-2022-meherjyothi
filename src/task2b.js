// DEPENDENCIES
const fs = require('fs');
const csv = require('csv-parser');
const randomWords = require('random-words');
const { parse } = require('csv-parse');
const { Octokit } = require("@octokit/core");
const { createPullRequest } = require("octokit-plugin-create-pull-request");
const { version } = require('os');
const username = require('git-username');
const { captureRejectionSymbol } = require('events');
const json2csv = require('json2csv').parse;
const csvwriter = require('csv-writer');

//FETCHING INPUT 
//var inputString = "myawesometool -i input.csv axios@0.23.0";
var inputString = "myawesometool -update -i input.csv axios@0.23.0";
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

var inputCSV = 'input.csv'

// READING THE CSV FILE
var data = fs.readFileSync(inputCSV, "utf8");
data = data.split("\r\n"); // SPLIT ROWS
for (let i in data) { // SPLIT COLUMNS
  data[i] = data[i].split(",");
}
data = arrayToJSONObject(data);

var correctJsonFile;
for(let i=0;i<data.length;i++)   
{
    data = data.filter(obj => obj.repo !== undefined);              // removing the null entries
    data = data.filter(obj => obj.name !== '');  

    var url = data[i].repo;

    let x = url.toString().slice(19).split("/");
    var owner = x[0];
    var repo = x[1];

    if(fs.existsSync("output"+i+".json"))
    {
        let jsonnn = fs.readFileSync("output"+i+".json");
        jsonnn = JSON.parse(jsonnn)
        jsonnn = JSON.stringify(jsonnn)

        const MyOctokit = Octokit.plugin(createPullRequest);  
        const TOKEN = "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";
        const octokit = new MyOctokit({
            auth: TOKEN,
            });
        console.log("-----------------------------");
        var num = Math.floor(Math.random()*1000);
        octokit
            .createPullRequest({
            owner: "meherjyothi",
            pull_number:num,
            repo: "test",
            title: "Update dependency",
            body: "PR description goes here",
            base: "main" ,
            head: ("branch"+num),
            changes: [
                {
                files: {
                    "package.json": jsonnn,
                },
                commit:
                    "updating the package.json file",
                },
            ],
            })

            .then((response) => {
            link = response.data.url;
            console.log("Generated PR Request : "+link);

            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
    
                path: 'final_output.csv',
                'append': true,
                header: [
                    {id: 'name', title: 'name'},
                    {id: 'repo', title: 'repo'},
                    {id: 'version', title: 'version'},
                    {id: 'version_satisfied', title: 'version_satisfied'},
                    {id: 'update_pr', title: 'update_pr'}
                ]
            });

            csvWriter.writeRecords(new Array(link))       // returns a promise
                .then(() => {
                    console.log('Data has been written to output.csv');
                });
            
        });
    }



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
