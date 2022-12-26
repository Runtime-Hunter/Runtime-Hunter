
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useStore } from "../../store/store";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./testcase-page.css";

const EditTestcaseSchema = z
  .object({
    input: z.string().optional(),
    output: z.string().optional(),
    timeLimit: z.string().nonempty(),
  });


function EditTestcase() {

  const [testcase, setTestcase] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(EditTestcaseSchema),
    mode: "all",
  });

  const [responseMessage, setResponseMessage] = useState("")

  const { courseId, levelId, testcaseId } = useParams();


  const getTestcase = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}/${testcaseId}`).then(res => {
      let testcase = res.data;
      testcase.timeLimit = (testcase.timeLimit).toString();
      setTestcase(testcase);
    })
  }

  const checkTestcaseUpdated = (newTestcase) => {
    if (testcase !== null && 
        newTestcase.timeLimit == testcase.timeLimit && 
        newTestcase.input == testcase.input && 
        newTestcase.output == testcase.output) {
      return false;
    }
    return true;
  }

  const onSubmit = async (data) => {
    const newTestcase = {
      input: data.input,
      output: data.output,
      timeLimit: parseInt(data.timeLimit)
    };

    const testcaseUpdated = checkTestcaseUpdated(newTestcase);

    if (testcaseUpdated) {

      await axios.put(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}/${testcaseId}`, newTestcase).then(res => {
        setResponseMessage(res.data.message)
      }).catch(err => {
        console.log(err)
        setResponseMessage(err.message)
      })
    }
    else {
      setResponseMessage("Testcase is already the same.");
    }
  };

  useEffect(() => {
    getTestcase();
  }, []);

  useEffect(() => {
    if (testcase !== null) {
      setValue("timeLimit", (testcase?.timeLimit));
      setValue("input", (testcase?.input));
      setValue("output", (testcase?.output));

    }
  }, [testcase]);
  
  return (
    <div>
      <Header/>
      
      <div className="dashedBorder mt-5">
        <div className="uploadContent">
          <div className="card-body">
            <div className="mt-3 d-flex flex-column">
              <input
                {...register("timeLimit")}
                className="btn-border input-style form-control"
                defaultValue={ testcase?.timeLimit}
                type="text"
              >
              </input>
              <small className="align-self-start error-text">
                {errors.timeLimit?.message}
              </small>
            </div> 
            <div className="mt-3 d-flex flex-column">
              <input
                {...register("input")}
                className="btn-border input-style form-control"
                defaultValue={testcase?.input}
                type="text"
              >
              </input>
              <small className="align-self-start error-text">
                {errors.input?.message}
              </small>
            </div>
            <div className="mt-3 d-flex flex-column">
              <textarea
                {...register("output")}
                className="btn-border input-style form-control"
                defaultValue={testcase?.output}
                type="text"
              >
              </textarea>
              <small className="align-self-start error-text">
                {errors.output?.message}
              </small>
            </div> 

        
            <button
              className="btn col-2 uploadBtn"
              // eslint-disable-next-line react/no-unknown-property
              styles={{ display: "none" }}
              onClick={handleSubmit(onSubmit)}
            >
              <span className="uploadBtnText"> 
                Update Testcase
              </span>
            </button> 

            <p>{responseMessage}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default EditTestcase;