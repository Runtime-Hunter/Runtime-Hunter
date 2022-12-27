
import axios from "axios";
import PropTypes from "prop-types";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { useNavigate } from "react-router";
import "../course/course.scss";

// eslint-disable-next-line react/prop-types
function Course({ courseId, courseName, description }) {

  const navigate = useNavigate();
  const goToCourse = (e) => {
    if(courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/course/${courseId}`)
    }
  }

  const deleteCourse = ()=> {
    if(courseId) {
      axios.delete(`${process.env.REACT_APP_URL}/api/course`, 
        { data: { courseId } })
        .then(res => {
          console.log(`deleted ${courseName}:`,res.data.message)

        })
        .catch(err => {
          console.log("error in deleting course", err.message)
        })
    }
    navigate("/courses/");
  }

  const updateCourse = ()=> {
    navigate(`/courses/update/${courseId}`)
    // if(courseId) {
    //   axios.put(`${process.env.REACT_APP_URL}/api/course`, 
    //     { data: { courseId } })
    //     .then(res => {
    //       console.log(`deleted ${courseName}:`,res.data.message)

    //     })
    //     .catch(err => {
    //       console.log("error in deleting course", err.message)
    //     })
    // }
    // navigate("/courses/");
  }


  return (
    <div>
      <button className="col-12 mb-1 btn btn-block btn-outline-success course-button">
        <div className="row justify-content-between">
          <div
            className="col-8 courseName"
            onClick={(e) => goToCourse(e)}
          >
            <a
              className="text-start course-link"
            >
              <h4>{`${courseName}`}</h4>
              <h5>{`${description}`}</h5>
            </a>

          </div>
          <div className='col-2 align-self-center edit'>
            <button
              className='btn btn-secondary'
              onClick={updateCourse}
            >Edit
            </button>
 
          </div>
          <div className='col-2 align-self-center'>
            <DeleteIcon
              onClick={deleteCourse}
              className='icon'
              size={24}
            />


          </div>
        </div>
      </button>
    </div>
  );
}



Course.propTypes = {
  courseId: PropTypes.string,
  concept:PropTypes.string,
  courseName: PropTypes.string,
  edit:PropTypes.func
}

Course.defaultProps = {
  courseId: "unknown",
  concept:"unknown",
  courseName: "unknown",
  // eslint-disable-next-line no-undef
  edit: () => any,
}
export default Course;
