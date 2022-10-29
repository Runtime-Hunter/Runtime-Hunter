import React, { useState } from "react";
import Select from "react-select";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css"; //Example style, you can use another
import Header from "../header/header";
import { languageOptions } from "./languageOptions";
import { Button, Col, Row, Container, Badge } from "react-bootstrap";

function QuestionPage() {

  const [lang, setLang] = useState(
    languageOptions[0]
  );
  
  const [code, setCode] = useState(
    lang ? (localStorage.getItem(`${"0"}_${lang.value}`) ? localStorage.getItem(`${"0"}_${lang.value}`) : lang.default) : languageOptions[0].default
  );
  const [output, setOutput] = useState("");
  const [details, setDetails] = useState("");


  function changeLang(language) {
    setLang(language);
    setCode(localStorage.getItem(`${"0"}_${language.value}`) ? localStorage.getItem(`${"0"}_${language.value}`) : language.default);
  }

  function saveCode(code) {
    setCode(code);
    localStorage.setItem(`${"0"}_${lang.value}`, code);
  }
  
  async function submit() {
    setOutput("");
    setDetails("Creating submission...\n");
    const formData = {
      "language_id": lang.id,
      "source_code": code,
      // "stdin": userInput
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
    const jsonResponse = await response.json();

    const submissionResult = await fetch(
      process.env.REACT_APP_RAPID_API_URL + "/" + jsonResponse.token,
      {
        method: "GET",
        params: { base64_encoded: "true" },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        },
      }
    );
    const subResult = await submissionResult.json();
    setOutput(subResult.stdout)
    setDetails("Time: " + subResult.time + "\nMemory: " + subResult.memory)
  }


  return (
    <div>
      <Header />
      <Container fluid>
        <Row style={{ padding: "10px" }}>
          <Col
            style={{ height: "600px" }}
            xs={6}
          >
            <LanguagesDropdown
              onSelectChange={changeLang}
            /> 
            <Editor
              value={code}
              onValueChange={code => saveCode(code)}
              highlight={code => highlight(code, languages[lang.highlighter])}
              padding={10}
              style={{
                height: "100%",
                fontFamily: "'Fira code', 'Fira Mono', monospace",
                fontSize: 12,
                borderColor: "grey",
                borderWidth: "0.5px",
                borderStyle: "solid",
                borderRadius: "4px"
              }}
            />
            <Button onClick={submit}>Compile & Run</Button>
          </Col>
          <Col>
            <h2>
              <Badge bg="secondary">Output:</Badge>
            </h2>
            <textarea
              style={{ width: "100%", height: "50%", padding: "8px" }}
              disabled
              value={output}
            />
            <h2>
              <Badge bg="secondary">Details:</Badge>
            </h2>
            <textarea
              style={{ width: "100%", height: "50%", padding: "8px" }}
              disabled
              value={details}
            />
          </Col>
        </Row>

      </Container>
    </div>
  );
}


// eslint-disable-next-line react/prop-types
const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <div style={{ width: "150px" }}>
      <Select
        isSearchable={false}
        placeholder={"Select Language"}
        options={languageOptions}
        defaultValue={languageOptions[0]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    </div>
  );
};

export default QuestionPage;