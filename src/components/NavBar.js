import React, { useState, useContext, useEffect } from "react";
import { Context } from "..";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/logo.svg";
import { observer } from "mobx-react-lite";

const NavBar = () => {
    const { store } = useContext(Context);
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        
        if (window.location.href == "http://localhost:3000/#/posts") {
            setCurrentPage('posts')
        }
        if (window.location.href == "http://localhost:3000/#/posts/create") {
            setCurrentPage("posts/create");
        }
        
      return () => {
        
      }
    }, [])
    

    return (
        <div className="nav-bar">
            <div className="nav-bar-container">
                <span className="nav-header">
                    <img src={Logo} alt="React Logo" />
                    Cherniak Blog CMS
                </span>
                {store.isAuth ? (
                    <ul className="nav-buttons">
                        <li>
                            {" "}
                            <Link to="/posts">
                                <button
                                    className={
                                        currentPage == "posts"
                                            ? "current-but"
                                            : ""
                                    }
                                    onClick={() => setCurrentPage("posts")}
                                >
                                    Posts
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/create">
                                <button
                                    className={
                                        currentPage == "posts/create"
                                            ? "current-but"
                                            : ""
                                    }
                                    onClick={() => setCurrentPage("posts/create")}
                                >
                                    New post
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button
                                className="logout-button"
                                onClick={() => store.logout()}
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default observer(NavBar);
