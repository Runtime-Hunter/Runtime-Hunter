
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./create-question.css";

const createQuestionSchema = z
  .object({
    levelName: z.string().nonempty(),
    levelDescription: z.string().nonempty(),
    difficulty: z.string().nonempty(),
  });


function CreateQuestion() {
  const { state } = useLocation();
  const { courseId } = state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createQuestionSchema),
    mode: "all",
  });


  const onSubmit = async (data) => {

    const level = {
      levelName: data.levelName,
      levelDescription: data.levelDescription,
      difficulty: data.difficulty,
      testCases: data.testCases,
      courseId,
    };

    console.log("level: ", level);


    await axios.post(`${process.env.REACT_APP_URL}/api/level/add`, level).then(res => {
      console.log(res);
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
                {...register("levelDescription")}
                className="btn-border input-style form-control"
                placeholder="Question Description"
                type="text"
              >
              </input>
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