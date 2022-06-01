**TITLE** </br>
SDK Tooling Challenge</br>

**PROBLEM STATEMENT**</br>
_Task 1_ </br>
Given a list of Github repositories, assuming all of them are node js projects with a package.json and package-lock.json in the root, and the name and version of a dependency, you want to give the current version of that dependency and tell if the version is greater than or equal to the version specified or not.</br>

_Task 2_ <br>
Secondly, for all the repositories that have the version lower than the one specified, if passed as additional param, let’s say `-update`, it should create a PR updating the version. </br>

----------------------------------------------



****HOW TO RUN****
  1. Clone git files
  2. Install all the dependencies using 'npm install < dependency-name >'
  3. Generate github token and assign it to the variable TOKEN in all the files
  4. Run the files using 'node <filename.js>'
  5. To perform task1, only run task1.js
  6. To perform task2, run task2a.js and task2b.js consequently, where task2b.js will give the final output in the file final_output.csv
  
  The following are the dependencies to be installed - 
  fs,
  csv-parser,
  csv-parse,
  @octokit/core,
  octokit-plugin-create-pull-request,
  os,
  events,
  json2csv,
  csv-writer
  
  --------------------------
  **RUNTIME ENVIRONMENT* </br>
  NodeJS
  
  ----------------------------

  **PROJECT DESCRIPTION** </br>
  _TASK 1 -  To generate a CSV with the name, repo, version, version_satisfied details_
  
 A single file named task1.js has been created for performing task1. Running this file alone is sufficient for task1. Upon running this, an output.csv file will be generated automatically. Make sure to create an _input.csv_ file in the same directory. </br>
  1. Fetch input from the user in the form "myawesometool -i <filename.csv> <dependency-name>@<version>" or "myawesometool -update -i <filename.csv> <dependency-name>@<version>" </br>
      eg : "myawesometool -i input.csv axios@0.23.0" or "myawesometool -update -i input.csv axios@0.23.0"
  2. Extract the input dependency and version from user's command, throw an exception if the input format is invalid
  3. Import all the dependencies using 'require'
  4. Read the input.csv file using 'fs' module into the array named data
  5. Convert the array to JSON and store it in the variable data again
  Inside a for loop iterating over each object in the variable data </br>
    i.  Filter non-null JSON onjects</br>
    ii. Get the repo URL's info using octokit module, by defining an async function getUrlInfo(). When calling this function, within its then() method, use the rest of the methods - </br>
      &nbsp;&nbsp; a. Extract the version from package.json file of the repo</br>
      &nbsp;&nbsp; b. Compare this extracted version with the input version provided by the user, and accordingly, store the boolean value inside a result variable </br>
      &nbsp;&nbsp; c. Using csv-writer module, write into the output.csv file - name, repo, version, version_satisfied</br>
     
  -------------------------
      
**PART B) To generate a CSV with the name, repo, version, update_pr after generating a pr updating the package.json file** </br>
Here, 2 files have been created, namely, _task2a.js_ and _task2b.js_. </br>

**Task2a.js**
  1. Fetch input from the user in the form "myawesometool -i <filename.csv> <dependency-name>@<version>" or "myawesometool -update -i <filename.csv> <dependency-name>@<version>" </br>
      eg : "myawesometool -i input.csv axios@0.23.0" or "myawesometool -update -i input.csv axios@0.23.0"
  2. Extract the input dependency and version from user's command, throw an exception if the input format is invalid
  3. Import all the dependencies using 'require'
  4. Read the input.csv file using 'fs' module into the array named data
  5. Convert the array to JSON and store it in the variable data again
  Inside a for loop iterating over each object in the variable data </br>
    i.  Filter non-null JSON onjects</br>
    ii. If version_satisfied is false for that object, modify the version according to the input version, and create a JSON file for that entry. Repeat this process in each iteration. </br></br>


**task2b.js** </br>

  1. Fetch input from the user in the form "myawesometool -i <filename.csv> <dependency-name>@<version>" or "myawesometool -update -i <filename.csv> <dependency-name>@<version>" </br>
      eg : "myawesometool -i input.csv axios@0.23.0" or "myawesometool -update -i input.csv axios@0.23.0"
  2. Extract the input dependency and version from user's command, throw an exception if the input format is invalid
  3. Import all the dependencies using 'require'
  4. Read the input.csv file using 'fs' module into the array named data
  5. Convert the array to JSON and store it in the variable data again
  Inside a for loop iterating over each object in the variable data </br>
    i.  Filter non-null JSON onjects</br>
    ii. Extract owner and repo details
    iii. Read the package.json file corresponding to that repository, that will appear as output0.json, output1.json, so on. Load the file into JSON object.
    iv.  Use create-pull-request module of octokit to create a pr, passing on the required parameters.
    v.   If version is not satisfied, create a pr to update the package.json in the repository, with the contents of the output0.json file, output1.json file, so on.
  
  
  ---------------------------
  
  **NOTE** </br>
Due to the presence of many asynchronized functions in my code, inorder to make sure the functionality is not affected, by say delayed promises, I had to code some redundant code. 
  
  
 -----------------------------
  
**  API REFERENCES** </br>
  The references to the APIs I have used for this assignment are mentioned below- </br>
  https://github.com/octokit/octokit.js/ </br>
  https://nodejs.org/api/fs.html </br>
  https://csv.js.org/parse/ </br>
  https://www.npmjs.com/package/csv-writer </br>
  https://www.npmjs.com/package/json2csv 


    
  
 


