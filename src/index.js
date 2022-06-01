//FETCHING INPUT 
var inputString = "myawesometool -i input.csv axios@0.23.0";
var inputString = "myawesometool -update -i input.csv axios@0.23.0";
var inputArr = inputString.split(" ");

console.log(inputArr[1]=="-update")
if(inputArr[1]!="-update")
{
    var update = false;
    var inputCSV = inputArr[2];
    var inputDependency = inputArr[3].split("@")[0];
    var inputVersion = inputArr[3].split("@")[1];

}
else if(inputArr[1]=="-update")
{
    var update = false;
    var inputCSV = inputArr[3];
    var inputDependency = inputArr[4].split("@")[0];
    var inputVersion = inputArr[4].split("@")[1];

}
else
{
    console.log("Enter a valid command");
    exit;
}
console.log(inputDependency)

//input
var inputDependency = "axios";
var inputVersion = "0.23.1";

//dependencies
const fs = require('fs');
const csv = require('csv-parser');
const randomWords = require('random-words');
const { parse } = require('csv-parse');
const { Octokit }= require('octokit');
const { version } = require('os');
const username = require('git-username');
const { captureRejectionSymbol } = require('events');
const json2csv = require('json2csv').parse;
const csvwriter = require('csv-writer');

//reading the csv file
var data = fs.readFileSync("input.csv", "utf8");
data = data.split("\r\n"); // SPLIT ROWS
for (let i in data) { // SPLIT COLUMNS
  data[i] = data[i].split(",");
}

data = arrayToJSONObject(data);

//console.log(data)          //one null obj
var result;

for(let i=0;i<data.length;i++)    //cuz of the columns too?  //***For loop ordering is random T_T */
{
    data = data.filter(obj => obj.repo !== undefined);              //removing the null entry
    data = data.filter(obj => obj.name !== '');  

    //console.log(data)    //no null obj 

    var url = data[i].repo;
    //console.log(url)      // working good

    //PROBLEM - the foor loop still gets executed while waiting for this stupidass async ughhhhhhhhhhhh  
    getUrlInfo(url)
        .then((response) => 
        { 
            let str = ((Buffer.from(response.content, 'base64')).toString());
            let json = JSON.parse(str);
            let dependencies = json.dependencies;
            let version = dependencies[inputDependency];
            version = version.replace('~', '').replace('^','');

        
            if(checkVersion(inputVersion, version)==-1)
                result= "false" ;
            else 
                result = "true" ;
            output = []
            output = data[i];
            output['version'] = version;
            output['versionSatisfied'] = result;
            data[i]['versionSatisfied'] = result;

            //console.log(data);
            
            //writing to csv file
            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
    
                path: 'output.csv',
                'append': true,
                header: [
                    {id: 'name', title: 'name'},
                    {id: 'repo', title: 'repo'},
                    {id: 'version', title: 'version'},
                    {id: 'versionSatisfied', title: 'versionSatisfied'},
                ]
            });

            csvWriter.writeRecords(new Array(data[i]))       // returns a promise
                .then(() => {
                    console.log('Data has been written to output.csv');
                });


        })
    }


//functions

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

