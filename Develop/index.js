const generateMarkdown = require("./utils/generateMarkdown");
const inquirer = require("inquirer");
const axios=require("axios");
// array of questions for userco
const fs=require("fs")
const questions = [
   {
       type:"input",
       message:"What is the title?",
       name:"title"
   },

   {
       type:"input",
       message:"What is the description?",
       name:"description"
   },

   {
       type:"input",
       message:"What is the installation?",
       name:"installation"
   },

   {
       type:"input",
       message:"What is the usage?",
       name:"usage"
   },
   
   {
       type:"input",
       message:"What are the credits?",
       name:"credits"
   },

   {
       type:"list",
       message:"Choose the followig lienses",
       name:"license",
       choices:["Apache","GNU GPL v3","MIT"]
   },

   {
       type:"input",
       message:"Who are the contributors?",
       name:"contributing"
   },

   {
       type:"input",
       message:"What are the tests?",
       name:"tests"
   },

   {
       type:"input",
       message:"Who is the github user?",
       name:"githubuser"
   }


];

// function to write README file
function writeToFile(fileName, data) {
fs.writeFile(fileName,data,function(err){
    if (err)throw err
    console.log("generate readme file completed")
})
}

// function to initialize program
function init() {
inquirer.prompt(questions).then(function(userinput){
    const data={}
    data.title=userinput.title
    data.description=userinput.description
    data.installation=userinput.installation
    data.usage=userinput.usage
    data.credits=userinput.credits
    data.license=userinput.license
    data.contributing=userinput.contributing
    data.tests=userinput.tests
    
    axios.get("https://api.github.com/users/"+userinput.githubuser).then(function(results){
        data.githubprofile=results.data.avatar_url
        data.githubemail=results.data.email

        const content=generateMarkdown(data)
        writeToFile("./README.md",content)
    })


})
}

// function call to initialize program
init();

 