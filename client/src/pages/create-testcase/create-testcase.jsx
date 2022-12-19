
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useStore } from "../../store/store";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./create-testcase.css";

const createTestcaseSchema = z
  .object({
    input: z.string().optional(),
    output: z.string().optional(),
    timeLimit: z.string().nonempty(),
  });


function CreateTestcase() {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTestcaseSchema),
    mode: "all",
  });

  const [responseMessage, setResponseMessage] = useState("")


  const [state] = useStore();
  const { user: currentUser } = state;

  const { courseId, levelId } = useParams();

  const onSubmit = async (data) => {
    const testcase = {
      input: data.input,
      output: data.output,
      timeLimit: parseInt(data.timeLimit)
    };

    console.log("creating test case:", testcase)


    await axios.post(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}`, testcase).then(res => {
      // navigate(`/courses/${courseId}/${levelId}`);
      setResponseMessage(res.data.message)
    }).catch(err => {
      console.log(err)
      setResponseMessage(err.message)
    })
  };
  
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
                placeholder="Time Limit"
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
                placeholder="Input"
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
                placeholder="Output"
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
                Create Testcase
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

export default CreateTestcase;