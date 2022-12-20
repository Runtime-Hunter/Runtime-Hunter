import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store.js";
import { useParams } from "react-router";
import Testcase from "../../components/testcase/testcase.jsx";
import "./testcases-page.css";
import Layout from "../../components/layout/layout.jsx";


function Testcases() {

  const [state] = useStore();
  const [testcasesList, setTestcasesList] = useState();
  const { courseId, levelId } = useParams();

  const getTestcases = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/api/testcase/${courseId}/${levelId}`)
      .then(res => {
        const data = res.data;
        let testcases = [];
        data.forEach(testcase => {
          testcases = testcases.concat(testcase)
          
        });

        console.log(testcases);

        setTestcasesList(testcases);
      }).catch(err => console.log(err))
  }


  useEffect(() => {
    getTestcases();
  },[]);
  
  return (
    <Layout>
      <div className="row m-4">
        <h4>Courses</h4>
        <div className="row mt-2">

          { testcasesList ?
            (testcasesList.length > 0 ?
              testcasesList.map((item, index) => {

                return(
                  <div
                    key={item._id}
                    className="row mt-4 testcase"
                  >
                    <div
                      className="col-10 col-lg-6"
                    >
                      <Testcase
                        courseId={courseId}
                        levelId={levelId}
                        testcaseId={item._id}
                        index={index}
                      >
                      </Testcase>
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

export default Testcases;