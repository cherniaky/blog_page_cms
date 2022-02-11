import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import "../styles/loginForm.css";


const LoginForm = () => {
    let navigate = useNavigate();   

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { store } = useContext(Context);

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="log-title"> Please log in</div>
                <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    type="text"
                    name="username"
                    placeholder="Username"
                />
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <Link to="/posts">
                    <button
                        type="submit"
                        onClick={() => store.login(username, password)}
                    >
                        Login
                    </button>
                </Link>
            </div>
            <div className="login-bottom">
                Wanna look around?{" "}
                <Link to="/posts">
                    <button
                        type="submit"
                        className="guest"
                        onClick={() => {
                            store.login("guest", "guest");
                        }}
                    >
                        Just visiting
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default observer(LoginForm);
