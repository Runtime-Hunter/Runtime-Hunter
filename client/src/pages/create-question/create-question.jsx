
import { zodResolver } from "@hookform/resolvers/zod";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { z } from "zod";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import { languageOptions } from "./../question-page/languageOptions";
import "./create-question.css";



const createQuestionSchema = z
  .object({
    levelName: z.string().nonempty(),
    levelTags: z.string().nonempty(),
    levelPosition: z.string().nonempty(),
    difficulty: z.string().nonempty(),
  });



function CreateQuestion() {

  const navigate = useNavigate();
  const { courseId } = useParams();

  const [descEditorState, setDescEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [solutionEditorState, setSolutionEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [responseMessage, setResponseMessage] = useState("")

  const [descConvertedContent, setDescConvertedContent] = useState(null);
  const [solutionConvertedContent, setSolutionConvertedContent] = useState(null);

  const [editorErrors, setEditorErrors] = useState({ codeCpp: "", codePy: "" })

  const [codeCpp, setCodeCpp] = useState(languageOptions[0].default);
  const [codePy, setCodePy] = useState(languageOptions[1].default);

  function saveCodeCpp(code) {
    setCodeCpp(code);
  }

  function saveCodePy(code) {
    setCodePy(code);
  }

  const handleDescEditorChange = (state) => {
    setDescEditorState(state);
    convertDescContentToHTML();
  }

  const handleSolutionEditorChange = (state) => {
    setSolutionEditorState(state);
    convertSolutionContentToHTML();
  }

  const convertDescContentToHTML = async () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(descEditorState.getCurrentContent()));
    setDescConvertedContent(currentContentAsHTML);
  }

  const convertSolutionContentToHTML = async () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(solutionEditorState.getCurrentContent()));
    setSolutionConvertedContent(currentContentAsHTML);
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createQuestionSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    await convertDescContentToHTML();
    await convertSolutionContentToHTML();

    if (codeCpp === languageOptions[0].default || codeCpp === "") {
      setEditorErrors(editorErrors => ({ ...editorErrors, codeCpp: "Cpp code should not be empty or default" }));
    }

    if (codePy === languageOptions[1].default || codePy === "") {
      setEditorErrors(editorErrors => ({ ...editorErrors, codePy: "Python code should not be empty or default" }));
    }

    if (editorErrors.codeCpp != "" || editorErrors.codePy != "") {
      return;
    }

    const level = {
      levelName: data.levelName,
      levelTags: data.levelTags,
      levelDescription: descConvertedContent,
      levelSolution: solutionConvertedContent,
      difficulty: data.difficulty,
      levelIndex: data.levelIndex,
      testCases: data.testCases,
      courseId,
      inputCpp: codeCpp,
      inputPy: codePy,
    };


    await axios.post(`${process.env.REACT_APP_URL}/api/level`, level).then(res => {
      console.log(res);
      setResponseMessage(res.data.message)
      // navigate("/courses");

    }).catch(err => {
      console.log(err)
      setResponseMessage(err.message)
    })
  };

  return (
    <div>
      <Header />
      <div className="dashedBorder mt-5">
        <div className="uploadContent">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="mt-3 d-flex flex-column">
                <input
                  {...register("levelName")}
                  className="btn-border input-style form-control"
                  placeholder="Question Name"
                  type="text"
                >
                </input>
                <small className="align-self-start error-text">
                  {errors.levelName?.message}
                </small>

              </div>
              <div className="mt-3 d-flex flex-column">
                <input
                  {...register("levelTags")}
                  className="btn-border input-style form-control"
                  placeholder="Question Tags"
                  type="text"
                >
                </input>
                <small className="align-self-start error-text">
                  {errors.levelName?.message}
                </small>

              </div>
              <div className="mt-5 d-flex flex-column text-editor-area">
                <h5>Description</h5>
                <div className="App">

                  <DraftEditor
                    editorState={descEditorState}
                    onEditorStateChange={handleDescEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </div>

                <small className="align-self-start error-text">
                  {errors.levelDescription?.message}
                </small>
              </div>

              <div className="mt-5 d-flex flex-column text-editor-area">
                <h5>Solution</h5>
                <div className="App">

                  <DraftEditor
                    editorState={solutionEditorState}
                    onEditorStateChange={handleSolutionEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </div>

                <small className="align-self-start error-text">
                  {errors.levelDescription?.message}
                </small>
              </div>

              <div className="mt-3 d-flex flex-column">

                <label htmlFor="difficulty">Difficulty:</label>

                <select
                  name="difficulty"
                  id="difficulty"
                  {...register("difficulty")}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <small className="align-self-start error-text">
                  {errors.difficulty?.message}
                </small>
              </div>

              <div className="mt-3 d-flex flex-column">
                <input
                  {...register("levelIndex")}
                  className="btn-border input-style form-control"
                  placeholder="Position of Question"
                  type="text"
                >
                </input>
                <small className="align-self-start error-text">
                  {errors.levelIndex?.message}
                </small>

              </div>

              <Row>
                <label
                  htmlFor="difficulty"
                  style={{ paddingTop: "30px" }}
                >Input Code:
                </label>

                <Col
                  style={{ height: "600px", padding: "20px" }}
                  xs={6}

                >
                  <small className="align-self-start error-text">
                    {editorErrors.codeCpp ?? ""}
                  </small>
                  <div>
                    C++
                  </div>
                  <CodeEditor
                    autoFocus
                    value={codeCpp}
                    language={"cpp"}
                    onChange={(evn) => saveCodeCpp(evn.target.value)}
                    padding={15}
                    minHeight={"480px"}
                    minLength={"400px"}
                    style={{
                      overflowWrap: "breakWord",
                      fontSize: "14",
                      fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </Col>

                <Col
                  style={{ height: "600px", padding: "20px" }}
                  xs={6}
                >
                  <small className="align-self-start error-text">
                    {editorErrors.codePy ? editorErrors.codePy : ""}
                  </small>
                  <div>
                    Python
                  </div>

                  <CodeEditor
                    autoFocus
                    value={codePy}
                    language={"python"}
                    onChange={(evn) => saveCodePy(evn.target.value)}
                    padding={15}
                    minHeight={"480px"}
                    minLength={"400px"}
                    style={{
                      overflowWrap: "breakWord",
                      fontSize: "14",
                      fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </Col>
              </Row>
              <button
                className="btn col-2 uploadBtn"
                // eslint-disable-next-line react/no-unknown-property
                // styles={{ display: "none" }}
                // onClick={() => {
                //   console.log("hello")
                //   return handleSubmit(onSubmit)
                // }}
                type="submit"
              >
                <span className="uploadBtnText">
              Create Question
                
                </span>
              </button>
              <p style={{ color: "red" }}>{responseMessage}</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default CreateQuestion;