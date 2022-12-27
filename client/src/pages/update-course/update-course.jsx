
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { useStore } from "../../store/store";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./update-course.css";

const createCourseSchema = z
  .object({
    courseName: z.string().nonempty(),
    description: z.string().nonempty(),
  });


function UpdateCourse() {
  
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(createCourseSchema),
    mode: "all",
  });


  const [state] = useStore();
  const { user: currentUser } = state;
  const { courseId } = useParams()
  const [course, setCourse] = useState()

  const fetchCourse = useCallback(
    async () => {
      if (courseId) {
        await axios
          .get(`${process.env.REACT_APP_URL}/api/course/${courseId}`)
          .then((res) => {
            if (res.data !== null) {
              setCourse(res.data);
            }
            else {
              navigate("/error");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
            // setErrorMessage("Error! Please try again.");
          });
      }
    },
    [courseId, navigate],
  )
  const checkCourseUpdated = (updatedCourse) => {
    if (course !== null && 
      updatedCourse.courseName == course.courseName && 
      updatedCourse.description == course.description ) {
      return false;
    }
    return true;
  }


  const onSubmit = async (data) => {
    const updatedCourse = {
      courseId:courseId,
      courseName: data.courseName,
      description: data.description,
    };
    setResponseMessage("")

    if(checkCourseUpdated(updatedCourse)) {
      console.log("Updated course:", updatedCourse)
      await axios.put(`${process.env.REACT_APP_URL}/api/course`, updatedCourse)
        .then(res => {
          console.log("Updated successfully.", res.data.message)
          setResponseMessage("Updated successfully.")
        })
        .catch(err => console.log(err))
    }
    else {
      setResponseMessage("No update. Course is the same.");

    }

  };

  useEffect(() => {
    fetchCourse()
  }, [courseId]);

  useEffect(() => {
    if (course !== null) {
      setValue("courseName", (course?.courseName));
      setValue("description", (course?.description));

    }
  }, [course]);
  
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
                defaultValue={course?.courseName}
                type="text"
              >
              </input>
              <small className="align-self-start error-text">
                {errors.courseName?.message}
              </small>
            </div>
            <div className="mt-3 d-flex flex-column">
              <textarea
                {...register("description")}
                className="btn-border input-style form-control"
                placeholder="Description"
                defaultValue={course?.description}
                type="text"
              >
              </textarea>
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
                Update Course
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

export default UpdateCourse;