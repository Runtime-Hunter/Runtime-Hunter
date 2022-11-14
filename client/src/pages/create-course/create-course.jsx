
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useStore } from "../../store/store";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./create-course.css";

const createCourseSchema = z
  .object({
    courseName: z.string().nonempty(),
    description: z.string().nonempty(),
  });


function CreateCourse() {
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCourseSchema),
    mode: "all",
  });


  const [state] = useStore();
  const { user: currentUser } = state;

  const onSubmit = async (data) => {
    console.log(data);
    const course = {
      courseName: data.courseName,
      description: data.description,
      creatorId: currentUser._id,
      ...(data.levels && { levels: data.levels }),
    };


    await axios.post(`${process.env.REACT_APP_URL}/api/course`, course).then(res => {
      navigate(`/${res.data.insertedId}/createQuestion`);
    }).catch(err => console.log(err))
  };
  
  return (
    <div>
      <Header/>
      <div className="upload-info row align-items-center">
        <div className="upload-headInfo">
          <h2 className="">Create  
            <span className="appearContentColor appearContentFont"> programming games
            </span> to help other programmers
          </h2>
        </div>
      </div>
      <div className="dashedBorder mt-5">
        <div className="uploadContent">
          <div className="card-body">
          
            <div className="mt-3 d-flex flex-column">
              <input
                {...register("courseName")}
                className="btn-border input-style form-control"
                placeholder="Course Name"
                type="text"
              >
              </input>
              <small className="align-self-start error-text">
                {errors.courseName?.message}
              </small>
            </div>
            <div className="mt-3 d-flex flex-column">
              <input
                {...register("description")}
                className="btn-border input-style form-control"
                placeholder="Description"
                type="text"
              >
              </input>
              <small className="align-self-start error-text">
                {errors.description?.message}
              </small>
            </div> 
        
            <button
              className="btn col-2 uploadBtn"
              // eslint-disable-next-line react/no-unknown-property
              styles={{ display: "none" }}
              onClick={handleSubmit(onSubmit)}
            >
              <span className="uploadBtnText"> 
                Create Course and Skip to Questions
              </span>
            </button> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default CreateCourse;