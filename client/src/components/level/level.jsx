
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";
import "../level/level.scss";

// eslint-disable-next-line react/prop-types
function Level({ courseId, levelId, levelName, levelDescription, difficulty }) {

  const navigate = useNavigate();

  const [state] = useStore();
  const { user: currentUser } = state;

  const goToLevel = (e) => {
    if(levelId !== "unknown" & courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}`)
    }
  }
  const addTestcase = (e) => {
    if(levelId !== "unknown" & courseId !== "unknown"){
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}/testcase`)
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
              onClick={(e) => goToLevel(e)}
            >
              <h4>{`${levelName}`}</h4>
              <h5>{`${levelDescription}`}</h5>
              <h5>{`${difficulty}`}</h5>
            </a>
            
          </div>
          {currentUser.userType == 2 &&
                    <div
                      className="col-2 align-self-center"
                    >
                      <button
                        className="search-bar-button"
                        onClick={(e) => addTestcase(e)}
                      >
              Add Testcase
                      </button>
                    </div>
          }
        </div>
      </div>
    </div>
  );
}



Level.propTypes = {
  levelId: PropTypes.string,
  levelName:PropTypes.string,
  levelDescription: PropTypes.string,
  difficulty: PropTypes.string,
  submissions: PropTypes.array,
  testCases: PropTypes.array,
  edit:PropTypes.func
}

Level.defaultProps = {
  levelId: "unknown",
  levelName:"unknown",
  levelDescription: "unknown",
  difficulty: "unknown",
  submissions: "unknown",
  testCases: "unknown",
  // eslint-disable-next-line no-undef
  edit: () => any,
}
export default Level;
