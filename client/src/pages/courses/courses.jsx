import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Course from "../../components/course/course.jsx";
import Layout from "../../components/layout/layout.jsx";

function Courses() {
  const { searchQuery } = useParams();

  const [list, setList] = useState();



  const getCourses = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/course`)
      .then(res => {
        const data = res.data;
        let courseList = [];
        data.forEach(course => {
          if(!searchQuery || searchQuery == " "){
            console.log("here")
            courseList = courseList.concat(course)
          }
          else if((course.courseName).toLowerCase().includes(searchQuery.toLowerCase())){
            courseList = courseList.concat(course)
          }
        });

        console.log(courseList);

        setList(courseList);
      }).catch(err => console.log(err))
  }


  useEffect(() => {
    console.log("Search Query",searchQuery)
    getCourses();
  },[searchQuery]);
  
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
                      className="col-9"
                    >
                      <Course
                        courseId={item._id}
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
