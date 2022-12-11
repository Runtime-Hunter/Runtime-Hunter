import React, { useEffect, useState } from "react";
import { AiFillFolder, AiFillHeart, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router";
import axios from "axios";

function Sidebar() {
  const [state] = useStore();
  const { user: currentUser } = state;
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  async function getFavorites() {
    const req_body = { userId: currentUser._id }
    await axios.get(`${process.env.REACT_APP_URL}/api/user/favorites`, { params: req_body })
      .then(res => {
        setFavorites(res.data);
      })
      .catch(err => {
        console.log("Error while getting favorites", err)
      })
  }

  useEffect(() => {
    getFavorites();
  }, []);


  return (
    <>
      <nav id="sidebar">
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
          <li>
            <span>
              <AiFillHeart />
            </span>
            Favorites
            {favorites.map((fav, index) => (
              <Link
                to={"/course/" + fav._id}
                key={index}
              >
                <div>
                  ↪{fav.courseName}
                </div>
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar;
