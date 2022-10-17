
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import "../course/course.scss";

function Course({ courseId, concept, courseName }) {

  const navigate = useNavigate();
  const goToCourse = (e) => {
    if(courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}`)
    }
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
              href = {`/courses/${courseId}`}
              className="text-start course-link"
            >
              <h4>{`${courseName}`}</h4>
              <h5>{`${concept}`}</h5>
            </a>
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
