import React from "react";
import { AiFillFolder, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./sidebar.scss";

function Sidebar() {
  return (
    <>
      <nav
        id="sidebar"
      >

        <ul className="list-unstyled components">
          <li className="active">
            <Link to="/">
              <span>
                <AiOutlineHome />
              </span>
          Home
            </Link>
          </li>
          <hr className="sidebar-divider solid"></hr>
          <li>

            <Link to="/courses/ ">
              <span>
                <AiFillFolder />
              </span>
               Courses
            </Link>


          </li>
          <hr className="sidebar-divider solid"></hr>
        </ul>
      </nav>

    </>
  )
}

export default Sidebar;
