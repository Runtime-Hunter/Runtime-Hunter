import React, { useState } from "react";
import "./question-page.css";
function Question() {

  const [input, setInput] = useState(localStorage.getItem("input") || "");
  const [languageId, setLanguageId] = useState(localStorage.getItem("languageId")|| 2);
  const [userInput, setUserInput] = useState("");

  function getInput (event) { 
    event.preventDefault();
    setInput(event.target.value);
    localStorage.setItem("input", event.target.value) 
  }
  
  function getUserInput (event) {
    event.preventDefault();
    setUserInput(event.target.value);
  }
  
  function updateLanguage (event) {  
    event.preventDefault();
    setLanguageId(event.target.value);
    localStorage.setItem("languageId", event.target.value)
  }
  
  async function submit (e){
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const formData = {
      "language_id": languageId,
      "source_code": input,
      "stdin": userInput
    };

    const response = await fetch(
      process.env.REACT_APP_RAPID_API_URL,
      {
        method: "POST",
        params: { base64_encoded: "true" },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
      
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "3c677db8e9mshe11a8b36ab6dba8p184c55jsn4818bfd19f58",
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
      }
    }
    
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      outputText.innerHTML = "";
      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  }
  
  return (
    <>
      <div className="row container-fluid">
        <div className="col-6 ml-4 ">
          <label htmlFor="solution ">
            <span className="badge badge-info heading mt-2 ">
              <i className="fas fa-code fa-fw fa-lg"></i> Code Here
            </span>
          </label>
          <textarea
            required
            name="solution"
            id="source"
            onChange={getInput}
            className=" source"
            value={input}
          >
          </textarea>
          <button
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={submit}
          >
            <i className="fas fa-cog fa-fw"></i> Run
          </button>

          <label 
            htmlFor="tags" 
            className="mr-1"
          >
            <b className="heading">Language:</b>
          </label>
          <select
            value={languageId}
            onChange={updateLanguage}
            id="tags"
            className="form-control form-inline mb-2 language"
          >
            <option value="54">C++</option>
            <option value="50">C</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
          </select>
        </div>
        <div className="col-5">
          <div>
            <span className="badge badge-info heading my-2 ">
              <i className="fas fa-exclamation fa-fw fa-md"></i> Output
            </span>
            <textarea id="output"></textarea>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-5">
        <span className="badge badge-primary heading my-2 ">
          <i className="fas fa-user fa-fw fa-md"></i> User Input
        </span>
        <br />
        <textarea
          id="input"
          onChange={getUserInput}
        >
        </textarea>
      </div>
    </>
  );
}

export default Question;
