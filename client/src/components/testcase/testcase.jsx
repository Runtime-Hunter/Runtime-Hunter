
import { useNavigate } from "react-router";
import "../course/course.scss";

// eslint-disable-next-line react/prop-types
function Testcase({ courseId, levelId, testcaseId, index }) {

  const navigate = useNavigate();
  const goToTestcase = (e) => {
    if(courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/course/${courseId}/${levelId}/${testcaseId}`)
    }
  }

  return (
    <div>
      <button className="col-12 mb-1 btn btn-block btn-outline-success course-button">
        <div className="row justify-content-between">
          <div
            className="col-8 courseName"
            onClick={(e) => goToTestcase(e)}
          >
            <a
              className="text-start course-link"
            >
              <h4>{`Testcase ${index}`}</h4>
            </a>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Testcase;
