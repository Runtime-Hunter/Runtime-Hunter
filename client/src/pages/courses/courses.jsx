import axios from "axios";
import { useEffect, useState } from "react";
import Course from "../../components/course/course.jsx";
import Layout from "../../components/layout/layout.jsx";


function Courses() {

  const [list, setList] = useState();



  const getCourses = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/course/all`)
      .then(res => {
        const data = res.data;
        console.log(data);
        let courseList = [];
        data.forEach(course => {
          courseList = courseList.concat(course)
        });

        console.log(courseList);

        setList(courseList);
      }).catch(err => console.log(err))
  }


  useEffect(() => {
    getCourses();
  }, [])
  return (
    <Layout>
      <div className="row m-4">
        <h4>Courses</h4>
        <div className="row mt-2">

          { list ?
            (list.length > 0 ?
              list.map((item) => {

                return(
                  <div
                    key={item._id}
                    className="row mt-4"
                  >
                    <div
                      className="col-10 col-lg-6"
                    >
                      <Course
                        courseId={item._id}
                        concept={item.concept}
                        courseName={item.courseName}
                        description={item.description}
                      >
                      </Course>
                    </div>
                  </div>

                );
              }) :<p>No course yet !!!</p>) :
            <p>Loading...</p>

          }



        </div>
      </div>
    </Layout>
  );
}

export default Courses;
