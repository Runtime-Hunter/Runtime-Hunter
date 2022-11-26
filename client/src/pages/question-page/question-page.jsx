import axios from "axios";
import { encode as base64_encode } from "base-64";
import "prismjs/components/prism-clike";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css"; //Example style, you can use another
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Editor from "react-simple-code-editor";
import { useStore } from "../../store/store";
import Header from "../header/header";
import { languageOptions } from "./languageOptions";
import "./question-page.css";

function QuestionPage() {
  const [state] = useStore();
  const { user: currentUser } = state;

  const navigate = useNavigate();

  const { courseId, levelId } = useParams();

  const [lang, setLang] = useState(
    languageOptions[0]
  );

  const [question, setQuestion] = useState();
  const [code, setCode] = useState(
    lang ? (localStorage.getItem(`${courseId}-${levelId}-${lang.value}`) ? localStorage.getItem(`${courseId}-${levelId}-${lang.value}`) : (question ? question.codeCpp : lang.default)) : languageOptions[0].default
  );
  const [output, setOutput] = useState("");
  const [details, setDetails] = useState("");
  const [testcaseResults, setTestcaseResults] = useState([]);

  function changeLang(language) {
    setLang(language);
    setCode(localStorage.getItem(`${courseId}-${levelId}-${language.value}`) ? localStorage.getItem(`${courseId}-${levelId}-${language.value}`) : (language.value === "python" ? question.codePy : question.codeCpp));
  }

  function saveCode(code) {
    setCode(code);
    localStorage.setItem(`${courseId}-${levelId}-${lang.value}`, code);
  }

  function clearLocalStorage(){
    if(courseId && levelId && lang){
      localStorage.removeItem(`${courseId}-${levelId}-${lang.value}`)
      setCode(lang.value === "python" ? question.codePy : question.codeCpp)
    }
  }

  const fetchLevel = useCallback(
    async () => {
      if (courseId && levelId) {
        await axios
          .get(`${process.env.REACT_APP_URL}/api/level/${courseId}/${levelId}`)
          .then((res) => {
            if(res.data !== null){
              console.log(res.data);
              setQuestion(res.data);
            }
            else{
              navigate("/error");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          })
      }
    },
    [courseId, levelId],
  )

  useEffect(() => {
    fetchLevel();
  }, [levelId])

  useEffect(() => {
    if (question) {
      setCode((lang.value == "python") ? question.codePy : question.codeCpp)
    }
  }, [question])

 

  async function getTestcases() {

    const testcases = await axios.get(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}`,).then(res => {
      if (res.data !== null) {
        return res.data;
      }
      else {
        navigate("/error");
      }
    }).catch(err => console.log(err))

    return testcases;
  }
 
  async function submit() {
    setOutput("");
    setDetails("Creating submission...\n");

    await getTestcases().then(async (testcases) => {
      for (let i = 0; i < testcases.length; i++) {
        console.log(testcases[i].input);
        // const formData = {
        //   "language_id": lang.id,
        //   "source_code": code,
        //   ...( testcases[i].input !== "" && { "stdin": testcases[i].input }),
        //   // "expected_output": testcases[i].output,
        // };
        const formData = {
          "language_id": lang.id,
          "source_code": base64_encode(code),
          ...( testcases[i].input !== "" && { "stdin": base64_encode(testcases[i].input) }),
          // "expected_output": encode(testcases[i].output),
        };

        const response = await fetch(
          process.env.REACT_APP_RAPID_API_URL + "?base64_encoded=true",
          {
            method: "POST",
            // params: { base64_encoded: "true", fields: "*" },
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
        console.log("submission first result", jsonResponse)

        const submissionResult = await fetch(
          process.env.REACT_APP_RAPID_API_URL + "/" + jsonResponse.token,
          // process.env.REACT_APP_RAPID_API_URL + "/bca25837-c46c-4a0f-9ab3-3f3552b2c667/?base64_encoded=true",
          {
            method: "GET",
            // params: { base64_encoded: "true", fields: "*" }
            headers: {
              "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
              "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            },
          }
        );
    
        const subResult = await submissionResult.json();
        console.log(subResult);
        // const testcasResultStatus = (parseInt(subResult.stdout) === parseInt(testcases[i].output) ? true : false);
        // const resultOutput = subResult.stdout.replace(/[\n\r]/g, "")
        let resultOutput = subResult.stdout
        resultOutput = resultOutput.trim()
        setOutput(resultOutput)
        console.log("Submission output: ",resultOutput)
        console.log("question output: ",testcases[i].output)
        const testcasResultStatus = (resultOutput === testcases[i].output ? true : false);
        setTestcaseResults([...testcaseResults, testcasResultStatus])
        const status = testcasResultStatus ? "Passed" : "Failed" 
        setDetails((oldDetail) => oldDetail + "\n" + "Input: " + testcases[i].input + " - Output: " + subResult.stdout + " => Result: " + status + "\n");

        let submission = {
          userId: currentUser._id,
          courseId: courseId,     
          levelId: levelId,
          timeSubmitted: new Date(Date.now()).toISOString(),
          status: testcasResultStatus,
          runtime: subResult.time,
          language: lang,
        };

        await axios.post(
          `${process.env.REACT_APP_URL}/api/submission`,
          submission,
        )
          .then(subRes => {
            console.log("Added submission to db", subRes)
          })
          .catch(err => {
            console.log("Error while adding submission to db", err)
          })
      }
      setDetails((oldDetail) => oldDetail.replace("Creating submission...", "All tests finished") );
      console.log("Testcase res: ", testcaseResults);
    }).catch(err => {
      console.log("Error: ", err);
    })
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
            <div
              style={{ width: "100%", height: "85%", padding: "8px" }}
              disabled
            >
              <h2>
                <Badge bg="secondary">{question ? question.levelName : ""}</Badge>
              </h2>
              <hr 
                className="solid"
              />
              {/* <div style={{ whiteSpace: "normal" }}>{question ? question.levelDescription : ""}</div> */}
              {question ? (question.levelDescription.split("\n")).map((item, index) => {
                return (
                  <div key={index}>
                    {item}
                    <br/>
                  </div>
                );
              }) : "" }
            </div>
          </Col>
          <Col
            style={{ height: "100%", marginTop: "6%" }}
            className={"questionPageDivider"}
          >
            
          </Col>
          <Col>
            <LanguagesDropdown
              onSelectChange={changeLang}
            /> 
            <Editor
              value={code}
              onValueChange={code => saveCode(code)}
              highlight={code => highlight(code, languages[lang.highlighter])}
              padding={10}
              style={{
                height: "85%",
                fontFamily: "'Fira code', 'Fira Mono', monospace",
                fontSize: 12,
                borderColor: "grey",
                borderWidth: "0.5px",
                borderStyle: "solid",
                borderRadius: "4px",
              }}
            />
            <Row>
              <Col>
                <Button
                  style={{ marginTop: "10px", }}
                  onClick={clearLocalStorage}
                >Clear code
                </Button>
              </Col>
              <Col>
                <Button
              
                  style={{ marginTop: "10px", display: "flex", marginLeft: "auto"  }}
                  onClick={submit}
                >Compile & Run
                </Button>
              </Col>
            </Row>
            {/* <h2>
              <Badge
                bg="secondary"
                style={{ marginTop: "10px", }}
              >Details:
              </Badge>
            </h2>
            <textarea
              style={{ width: "100%", height: "23%", padding: "8px" }}
              disabled
              value={details}
            /> */}
            
          </Col>
          {/* {(testcaseResults && testcaseResults.length > 0) ? (testcaseResults.map((result, index) => {
            return(
              <p
                key={index}
              > Testcase {testcaseResults.length} is passed
              </p>
            )
          })) : ""} */}
        </Row>

      </Container>
    </div>
  );
}


// eslint-disable-next-line react/prop-types
const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <div style={{ width: "150px", paddingBottom: "13px" }}>
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