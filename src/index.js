import React, { createContext } from "react";
import ReactDOM from "react-dom";
import './styles/normalize.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Store from "./store/store";
import { HashRouter } from "react-router-dom";

const store = new Store();

export const Context = createContext({
  store
})

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename="/">
            <Context.Provider
                value={{
                    store,
                }}
            >
                <App />
            </Context.Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
