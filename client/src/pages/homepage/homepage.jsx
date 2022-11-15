import { useEffect, useState, useCallback } from "react";
import Course from "../../components/course/course.jsx";
import Layout from "../../components/layout/layout.jsx";
import { useStore } from "../../store/store";
import axios from "axios";
import { useNavigate } from "react-router";
import "../homepage/homepage.css";



function Homepage() {
  const [state] = useStore();
  const { user: currentUser } = state;

  const navigate = useNavigate();


  const [list, setList] = useState();

  const fetchCreatedCourses = useCallback(
    async () => {
      if (currentUser) {
        const userId = currentUser._id;
        await axios
          .get(`${process.env.REACT_APP_URL}/api/user/course/${userId}`)
          .then((res) => {
            if(res.data !== null){
              console.log(res.data);
              setList(res.data);
            }
            else{
              console.log(res);
              navigate("/error");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          })
      }
    },
    [currentUser],
  )

  useEffect(() => {
    if (currentUser.userType == 2) {
      fetchCreatedCourses();
    }
    else {
      let favCoursesList = currentUser.favouriteCourses;

      if (favCoursesList) {
        setList(favCoursesList);
      }
  
    }
   
  }, [currentUser]);


  return (
    <Layout>
      <div className="row homepage-margin">
        <div className="row mt-4">
          <h4>My Courses</h4>
          <div className="row mt-2">
            { list ?
              (list.length > 0 ?
                list.map((item) => {

                  return(
                    <div
                      key={item._id}
                      className="row mb-3"
                    >
                      <div className="col-10 col-lg-6">
                        <Course
                          courseId={item._id}
                          courseName={item.courseName}
                          description={item.description}
                        >
                        </Course>
                      </div>
                    </div>
                  );
                }) :<p>No course yet !!!</p>)            :
              <p>Loading...</p>

            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
