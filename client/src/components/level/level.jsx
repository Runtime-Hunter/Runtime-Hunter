import axios from "axios";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";
import "../level/level.scss";

// eslint-disable-next-line react/prop-types
function Level({ courseId, levelId, levelName, levelTags, difficulty, unlock }) {

  const navigate = useNavigate();

  const [state] = useStore();
  const { user: currentUser } = state;

  const goToLevel = (e) => {
    if (levelId !== "unknown" & courseId !== "unknown") {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}`)
    }
  }
  const addTestcase = (e) => {
    if (levelId !== "unknown" & courseId !== "unknown") {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}/testcase`)
    }
  }
  const seeTestcases = (e) => {
    if (levelId !== "unknown" & courseId !== "unknown") {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}/testcases`)
    }
  }

  const updateLevel = (e) => {
    if (levelId !== "unknown" & courseId !== "unknown") {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/courses/${courseId}/${levelId}/update`)
    }
  }


  const deleteLevel = ()=> {
    if(courseId) {
      axios.delete(`${process.env.REACT_APP_URL}/api/level`, 
        { data: { courseId, levelId } })
        .then(res => {
          console.log("deleted level:",res.data.message)
          // navigate(`/courses/${courseId}`)
          // window.location.replace(`/courses/${courseId}`);
          window.location.reload(false);

        })
        .catch(err => {
          console.log("error in deleting course", err.message)
        })
    }
    // navigate("/courses");
  }

  const difficulties = {
    "easy": { color: "success", label: "Easy" },
    "medium": { color: "warning", label: "Medium" },
    "hard": { color: "danger", label: "Hard" },
  }

  return (
    <div>
      <div className="col-12 mb-3 btn btn-block btn-outline-success course-button">
        <div className="row justify-content-between">

          <div
            className="col-5 courseName"
          >
            {unlock || currentUser.userType == 2 ?
              <a
                className="text-start course-link"
                onClick={(e) => goToLevel(e)}
              >
                <h4>
                  <Badge bg={difficulties[difficulty].color}>
                    {difficulties[difficulty].label}
                  </Badge>
                  <span className="mx-2">{levelName}</span>
                </h4>
                <h5 className="mt-2">{levelTags}</h5>

              </a> :
              <p
                className="text-start"
                style={{ textDecoration: "none" }}
              >
                <h4>
                  <Badge bg={difficulties[difficulty].color}>
                    {difficulties[difficulty].label}
                  </Badge>
                  <span className="mx-2">{levelName}</span>
                </h4>
                <h5 className="mt-2">{levelTags}</h5>
              </p>
            }
          </div>

          {!unlock && currentUser.userType != 2 &&
            <div className="col-2 align-self-center"><i
              className='fa-solid fa-lock'
            />
            </div>}

          {currentUser.userType == 2 &&

          <>
            <div
              className="col-2 align-self-center level-btn"
            >
              <button
                className="btn btn-success btn-sm"
                onClick={(e) => seeTestcases(e)}
              >
                See Testcases
              </button>
            </div>

            <div
              className="col-2 align-self-center level-btn"
            >
              <button
                className="btn btn-success btn-sm"
                onClick={(e) => addTestcase(e)}
              >
                Add Testcase
              </button>
            </div>
            <div
              className="col-2 align-self-center level-btn"
            >
              <button
                className="btn btn-secondary btn-sm"
                onClick={(e) => updateLevel(e)}
              >
                Edit Level
              </button>
            </div>
            <div className='col-1 align-self-center'>
              <DeleteIcon
                onClick={deleteLevel}
                className='icon'
                size={24}
              />
            </div>
          </>
          }
        </div>
      </div>
    </div>
  );
}



Level.propTypes = {
  levelId: PropTypes.string,
  levelName: PropTypes.string,
  levelTags: PropTypes.string,
  levelDescription: PropTypes.string,
  difficulty: PropTypes.string,
  // submissions: PropTypes.array,
  // testCases: PropTypes.array,
  // edit: PropTypes.func
}

Level.defaultProps = {
  levelId: "unknown",
  levelName: "unknown",
  levelTags: "unknown",
  levelDescription: "unknown",
  difficulty: "unknown",
  // submissions: "unknown",
  // testCases: "unknown",
  // eslint-disable-next-line no-undef
  // edit: () => any,
}
export default Level;
