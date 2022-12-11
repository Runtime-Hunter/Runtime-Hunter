import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import Level from "../../components/level/level.jsx";
import { useStore } from "../../store/store.js";
import { userLogin } from "../../store/userReducer";
import "./course-page.css";

const { default: Layout } = require("../../components/layout/layout");

function CoursePage() {

  // const getLevels = async () => {
  //   await axios.get(`${process.env.REACT_APP_URL}/api/level`, { courseId: courseId })
  //     .then(res => {
  //       console.log("aa: ", res.data);
  //       const data = res.data;
  //       let levels = [];
  //       data.forEach(level => {
  //         level.courses.forEach(course => {
  //           levels = levels.concat(...course.comments)
  //         })
  //       });
  //       console.log(commentList);
  //     }).catch(err => console.log(err))
  // }

  // useEffect(() => {
  //   getLevels();
  // }, [])

  const [state, dispatch] = useStore();
  const { user: currentUser } = state;

  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [levels, setLevels] = useState();

  const [isFav, setIsFav] = useState(false);

  const navigate = useNavigate()


  const fetchCourse = useCallback(
    async () => {
      if (courseId) {
        await axios
          .get(`${process.env.REACT_APP_URL}/api/course/${courseId}`)
          .then((res) => {
            if (res.data !== null) {
              setCourse(res.data);
              var levelsArrEasy = [];
              var levelsArrMedium = [];
              var levelsArrHard = [];
              for (let i = 0; i < res.data.levels.length; i++) {
                if (res.data.levels[i].difficulty === "easy") levelsArrEasy.push(res.data.levels[i]);
                if (res.data.levels[i].difficulty === "medium") levelsArrMedium.push(res.data.levels[i]);
                if (res.data.levels[i].difficulty === "hard") levelsArrHard.push(res.data.levels[i]);
              }

              setLevels([...levelsArrEasy, ...levelsArrMedium, ...levelsArrHard]);

            }
            else {
              navigate("/error");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
            // setErrorMessage("Error! Please try again.");
          });

        const favs = await axios.get(`${process.env.REACT_APP_URL}/api/user/favorites`, { params: { userId: currentUser._id } })

        setIsFav(favs.data.map(x => x._id).includes(courseId))
      }
    },
    [courseId, navigate],
  )

  const addToFav = async () => {
    if (isFav) {
      return;
    }
    await axios.post(`${process.env.REACT_APP_URL}/api/user/favorites`,
      { userId: currentUser._id, courseId: courseId })
      .then(res => {
        setIsFav(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const removeFromFav = async () => {
    await axios.delete(`${process.env.REACT_APP_URL}/api/user/favorites`,
      { data: { userId: currentUser._id, courseId: courseId } })
      .then(res => {
        setIsFav(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addLevel = () => {
    navigate(`/${courseId}/createQuestion`);
  }


  // useEffect(() => {
  //   if (course) {
  //     let courseItem = {
  //       courseId: course.courseId,
  //       name: course.courseName,
  //       university: course.university
  //     };
  //     let recent_courses = localStorage.getItem("recentCourses");

  //     if (recent_courses) {
  //       console.log("bb");
  //       let arr_recent_courses = JSON.parse(recent_courses);
  //       let flag = false;
  //       for (let i = 0; i < arr_recent_courses.length; i++) {
  //         if (arr_recent_courses[i].courseId === courseItem.courseId &&
  //           arr_recent_courses[i].university === courseItem.university &&
  //           arr_recent_courses[i].name === courseItem.name) {
  //           flag = true;
  //           break;
  //         }
  //       }
  //       if (!flag) {
  //         arr_recent_courses.push(courseItem);
  //         if (arr_recent_courses.length == 5) {
  //           arr_recent_courses = arr_recent_courses.slice(1,5);
  //         }
  //       }
  //       localStorage.setItem("recentCourses", JSON.stringify(arr_recent_courses));
  //     }
  //     else {
  //       localStorage.setItem("recentCourses", JSON.stringify([courseItem]));
  //       console.log(JSON.stringify([courseItem]));
  //     }
  //   }
  // }, [course]);


  useEffect(() => {
    fetchCourse();
  }, [courseId, fetchCourse])


  return (
    <Layout>
      {course ?
        <div className="row homepage-margin">
          <div className="col">
            <div className="row mt-4">

              <div
                className="col-1"
              >
                {isFav ? <FcLike
                  onClick={removeFromFav}
                  className='favIcon'
                  size={32}
                /> :

                  <AiOutlineHeart
                    className='favIcon'
                    onClick={addToFav}
                    size={32}
                  />
                }

              </div>
              <div
                className="col-7 align-self-center"
              >
                <h1 className="text-center">{course ? (course.courseName).replace("_", " ") : ""}
                </h1>
              </div>
              {course.creatorId == currentUser._id &&

                <div
                  className="col-2 align-self-center"
                >
                  <button
                    onClick={addLevel}
                    className="search-bar-button"
                  >Add level
                  </button>
                </div>
              }
            </div>

            <div className="row mt-4">
              <h4>Levels</h4>
              {levels != undefined ?
                levels.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="row"
                    >
                      <Level
                        courseId={courseId}
                        levelId={item.levelId}
                        levelName={item.levelName}
                        levelTags={item.levelTags ?? ""}
                        difficulty={item.difficulty}
                      />

                    </div>
                  );
                }) :
                <p>No file found for this course</p>
              }
            </div>
          </div>
        </div> :
        <p>Loading...</p>
      }
    </Layout>
  )
}

export default CoursePage;