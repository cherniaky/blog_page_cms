import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { Context } from "..";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { store } = useContext(Context);


    return (
        <div>
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
            <button onClick={() => store.login(username, password)}>
                Login
            </button>
        </div>
    );
};

export default observer(LoginForm);
