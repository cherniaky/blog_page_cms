import React, { useContext } from "react";
import { Context } from "..";
import "../styles/navbar.css";
import Logo from "../icons/logo.svg";

const NavBar = () => {
    const { store } = useContext(Context);
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
                            <button onClick={() => 0}>Posts</button>
                        </li>
                        <li>
                            <button onClick={() => 0}>New post</button>
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

export default NavBar;
