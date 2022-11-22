import Layout from "../../components/layout/layout.jsx";
import { useStore } from "../../store/store";
import "./profile-page.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import { useState , useEffect, useCallback } from "react";


function ProfilePage() {
  const [state] = useStore();
  const { user: currentUser } = state;
  const [correctQuestions, setCorrectQuestions] = useState();
  const [difficultyCounts, setDifficultyCounts] = useState();
  const navigate = useNavigate();


  const goToChangePassword = (e) => {
    navigate("/change-password")
  }
  
  const getCorrectlySolvedQuestions = async () => {

    await axios.post(`${process.env.REACT_APP_URL}/api/levels/user`, { "levelIds": currentUser.correctlySolvedQuestions })
      .then(res => {
        console.log(res);
        const data = res.data;
        let levelList = [];
        let difficultyObj = {
          "easy": 0,
          "medium": 0,
          "hard": 0,
        };
        data.forEach(level => {
          difficultyObj[level.difficulty]++;
          levelList = levelList.concat(level)
        });

        console.log(levelList);

        setCorrectQuestions(levelList);
        setDifficultyCounts(difficultyObj);
      }).catch(err => console.log(err))
  }
  

  useEffect(() => {
    getCorrectlySolvedQuestions();
  }, []);

  return (
    <Layout>
      <div className="profile-info row align-items-center mr-0">
        <div className="col-2 profileImgLocation mt-2">
          <div className="text-center d-flex justify-content-center align-items-center profileImg">{currentUser.username.substring(0,2).toUpperCase()}</div>
        </div>
        <div className="col-4">
          <div className="mt-3" >
            <p>
              Username: {currentUser ? currentUser.username: ""}
            </p>
            <p>
              E-mail: {currentUser ? currentUser.email: ""}
            </p>
          </div>
        </div>
        <div className="col-2 offset-3 mt-0">
          <button
            onClick = {goToChangePassword}
            className="col-12 btn btn-block btn-danger"
          >
            Change Password
          </button>
        </div>
      </div>
      <hr className="profile-page-divider mx-5 solid"></hr>
      <div className=" row align-items-center mr-0">
        <div className="col-2 profileImgLocation mt-2">
        
          {difficultyCounts ? 
            <PieChart
              lineWidth={20}
              radius={35}
              data={[
                { title: "Easy", value: difficultyCounts["easy"], color: "#1E8449" },
                { title: "Medium", value: difficultyCounts["medium"], color: "#E7A428" },
                { title: "Hard", value: difficultyCounts["hard"], color: "#A93226" },
              ]}
            /> :
            undefined}
        </div>
        <div className="col-4">
          <div className="mt-3" >
            <p>
              Easy: {difficultyCounts ? difficultyCounts["easy"]: ""}
            </p>
            <p>
              Medium: {difficultyCounts ? difficultyCounts["medium"]: ""}
            </p>
            <p>
              Hard: {difficultyCounts ? difficultyCounts["hard"]: ""}
            </p>
          </div>
        </div>
      </div>
      
      <hr className="profile-page-divider mx-5 solid"></hr>
    </Layout>


  );
}

export default ProfilePage;
