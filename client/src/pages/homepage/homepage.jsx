import { useEffect, useState } from "react";
import Course from "../../components/course/course.jsx";
import Layout from "../../components/layout/layout.jsx";
import { useStore } from "../../store/store";
import "../homepage/homepage.css";



function Homepage() {
  const [state] = useStore();
  const { user: currentUser } = state;

  const [list, setList] = useState();


  useEffect(() => {
    let favCoursesList = currentUser.favouriteCourses;

    if (favCoursesList) {
      setList(favCoursesList);
    }

  }, []);


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
                      key={item.courseCode}
                      className="row mb-3"
                    >
                      <div className="col-10 col-lg-6">
                        <Course
                          courseCode={item.courseCode}
                          university={item.university}
                          name={item.courseName}
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
