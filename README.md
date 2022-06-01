****HOW TO RUN****
  1. Clone git files
  2. Install all the dependencies using 'npm install <dependency-name>'
  3. Generate github token and assign it to the variable TOKEN in all the files
  4. Run the files using 'node <filename.js>'
  5. To perform task1, only run task1.js
  6. To perform task2, run task2a.js and task2b.js consequently, where task2b.js will give the final output in the file final_output.csv
  
  --------------------------

  **PROJECT DESCRIPTION** </br>
  _TASK 1 -  To generate a CSV with the name, repo, version, version_satisfied details_
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
      
**PART B) To generate a CSV with the name, repo, version, update_pr after generating a pr updating the package.json file**
    
  
 


