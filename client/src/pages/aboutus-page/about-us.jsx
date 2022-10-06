import { IoMdSchool } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";
import { RiNumbersFill } from "react-icons/ri";

import bookImg from "../../assets/aboutUs.jpeg";
import Mert from "../../assets/mert.jpg";
import MPhoto from "../../assets/mizbah.jpg";
import Kerem from "../../assets/kerem.jpg";

import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";
import "./about-us.scss";
function AboutUs() {
  return (
    <div>
      <Header />
      <div className="about-info align-items-center">
        <div className="about-headInfo">
          <h2 className="h2_about">
            Our
            <span className="appearContentColor appearContentFont">
              {" "}
              mission
            </span>{" "}
            is to help people who are interested in learning different programming concepts with various games
          </h2>
          <img
            src={bookImg}
            alt="Happy student using Courseflow"
            className="aboutUsImg"
          >
          </img>
        </div>
      </div>
      <div className="site_contents">
        <div className="row mt-1 aboutUs_contents">
          <div className="col-4 site_contents_div">
            <IoMdSchool
              className="site_contents_icon"
              style={{ color: "#0088d7" }}
            />
            <p
              // eslint-disable-next-line react/no-unknown-property
              weight="bold"
              style={{ margin: "0 0 10px", color: "#0088d7" }}
            >
              Languages
            </p>
            <p className="site_contents_p">
              No need to know any language, you can learn it from stratch
            </p>
          </div>
          <div className="col-4 site_contents_div">
            <HiDocumentText
              className="site_contents_icon"
              style={{ color: "#b987ce" }}
            />
            <p
              // eslint-disable-next-line react/no-unknown-property
              weight="bold"
              style={{ margin: "0 0 10px", color: "#b987ce" }}
            >
              Algorithms
            </p>
            <p className="site_contents_p">
              Practice algorithms for interviews and exams with your preferred language
            </p>
          </div>
          <div className="col-4 site_contents_div">
            <RiNumbersFill
              className="site_contents_icon"
              style={{ color: "#fabf26" }}
            />
            <p
              // eslint-disable-next-line react/no-unknown-property
              weight="bold"
              style={{ margin: "0 0 10px", color: "#fabf26" }}
            >
              Programming Concepts
            </p>
            <p className="site_contents_p">
              Learn different topics with your preferred language
            </p>
          </div>
        </div>
      </div>
      {/*eslint-disable-next-line react/no-unknown-property*/}
      <div styles={{ padding: "30px 0" }}>
        <div className="founder">
          <h2 className="founder_h2"> Founders </h2>
          <div className="founder_contents">
            <div className="row mt-1 ">
              <div className="col-4 founder_contents_in founder_contents_box">
                <img
                  className="founder_img"
                  src={Mert}
                  alt="imageFounder"
                >
                </img>
                <p className="founder_name">Mert Türe</p>
                <p className="founder_pos">Software Engineer</p>
                <p className="founder_info">
                  Currently studying Computer Science and interested in Algoritmic solutions and
                  Backend Engineering.
                </p>
              </div>
              <div className="col-4 founder_contents_in founder_contents_box">
                <img
                  className="founder_img"
                  src={MPhoto}
                  alt="imageFounder"
                >
                </img>
                <p className="founder_name">Mizbah Çelik</p>
                <p className="founder_pos">Software Engineer</p>
                <p className="founder_info">
                  Computer Science and Engineering Student mostly interested in Full-Stack
                  development and Badminton
                </p>
              </div>
              <div className="col-4 founder_contents_in founder_contents_box">
                <img
                  className="founder_img"
                  src={Kerem}
                  alt="imageFounder"
                >
                </img>
                <p className="founder_name">Kerem Kör</p>
                <p className="founder_pos">Software Engineer</p>
                <p className="founder_info">
                  A computer-science student with math background who wants to be working on Game
                  Development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
