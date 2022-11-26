
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { z } from "zod";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { languageOptions } from "./../question-page/languageOptions";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css"; //Example style, you can use another
import "./create-question.css";
import { Col, Row } from "react-bootstrap";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { ContentState, convertToRaw } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./create-question.css";
import { convertToHTML } from "draft-convert";



const createQuestionSchema = z
  .object({
    levelName: z.string().nonempty(),
    levelTags: z.string().nonempty(),
    difficulty: z.string().nonempty(),
  });



function CreateQuestion() {

  const navigate = useNavigate();
  const { courseId } = useParams();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const  [convertedContent, setConvertedContent] = useState(null);
  
  const [editorErrors, setEditorErrors] = useState({ codeCpp: "", codePy: "" })

  const [codeCpp, setCodeCpp] = useState(languageOptions[0].default);
  const [codePy, setCodePy] = useState(languageOptions[1].default);

  function saveCodeCpp(code) {
    setCodeCpp(code);
  }

  function saveCodePy(code) {
    setCodePy(code);
  }

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = async () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
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
    await convertContentToHTML();
    
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
      levelDescription: convertedContent,
      difficulty: data.difficulty,
      testCases: data.testCases,
      courseId,
      inputCpp: codeCpp,
      inputPy: codePy,
    };


    await axios.post(`${process.env.REACT_APP_URL}/api/level`, level).then(res => {
      console.log(res);
      navigate("/courses");

    }).catch(err => console.log(err))
  };
  
  return (
    <div>
      <Header/>
      <div className="dashedBorder mt-5">
        <div className="uploadContent">
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
            <div className="mt-3 d-flex flex-column text-editor-area">
              <div className="App">
             
                <DraftEditor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
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
                <Editor
                  value={codeCpp}
                  onValueChange={code => saveCodeCpp(code)}
                  highlight={code => highlight(code, languages[languageOptions[0].highlighter])}
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

                <Editor
                  {...register("codePy")}

                  value={codePy}
                  onValueChange={code => saveCodePy(code)}
                  highlight={codePy => highlight(codePy, languages[languageOptions[1].highlighter])}
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
              </Col>         
            </Row>
            <button
              className="btn col-2 uploadBtn"
              // eslint-disable-next-line react/no-unknown-property
              styles={{ display: "none" }}
              onClick={handleSubmit(onSubmit)}
            >
              <span className="uploadBtnText"> 
                Create Question 
              </span>
            </button> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default CreateQuestion;