
import axios from "axios";
import { useNavigate } from "react-router";
import "../course/course.scss";

// eslint-disable-next-line react/prop-types
function Testcase({ courseId, levelId, testcaseId, index }) {

  const navigate = useNavigate();
  const goToTestcase = (e) => {
    if(courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}/${testcaseId}`)
    }
  }

  const deleteTestcase = async (e) => {
    if(courseId !== "unknown" && levelId !== "unknown" && testcaseId !== "undefined"){
      e.preventDefault();
      e.stopPropagation();
      
      await axios.delete(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}/${testcaseId}`).then(res => {
        navigate(`/courses/${courseId}/${levelId}/testcases`);
      })
    }
  }

  return (    
    <div>
      <div className="col-12 mb-1 btn btn-block btn-outline-success course-button">
        <div className="row justify-content-between">
          <div
            className="col-8 courseName"
          >
            <a
              className="text-start course-link"
              onClick={(e) => goToTestcase(e)}
            >
              <h4>
                <span className="mx-2">{`Testcase ${index}`}</span>
              </h4>

            </a>
          </div>
          <div
            className="col-2 align-self-center"
          >
            <button
              className="search-bar-button"
              onClick={(e) => deleteTestcase(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testcase;
