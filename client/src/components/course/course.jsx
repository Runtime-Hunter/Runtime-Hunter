
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import "../course/course.scss";

function Course({ courseCode, name }) {

  const navigate = useNavigate();
  const goToCourse = (e) => {
    if(courseCode !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseCode}`)
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
              href = {`/courses/${courseCode}`}
              className="text-start course-link"
            >
              <h4>{`${name.replace("_", " ")}`}</h4>
              <h5>{`${courseCode.replace("_", " ")}`}</h5>
            </a>
          </div>
        </div>
      </button>
    </div>
  );
}



Course.propTypes = {
  courseCode:PropTypes.string,
  name: PropTypes.string,
  addToFav:PropTypes.func
}

Course.defaultProps = {
  courseCode:"unknown",
  name: "unknown",
  // eslint-disable-next-line no-undef
  addToFav: () => any,
}
export default Course;
