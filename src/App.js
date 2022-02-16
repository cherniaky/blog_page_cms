import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from ".";
import { EditPost } from "./components/EditPost";
import LoginForm from "./components/loginForm";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import { Posts } from "./components/Posts";
import BlogService from "./services/BlogService";
import "./styles/App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
 
import { Oval } from "react-loader-spinner";
import { NewPost } from "./components/NewPost";

function App() {
    const { store } = useContext(Context);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }

        let postsres = await BlogService.getPosts();

        setPosts(postsres.data.posts);
       
    }, []);

    if (store.isLoading) {
        return (
            <div className="App loading-container">
                {" "}
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    if (!store.isAuth) {
        return (
            <div className="App">
                <NavBar />
                <div className="container">
                    <LoginForm />
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <NavBar />
            <div className="container">
                <Routes>
                    <Route
                        exact
                        path="/posts"
                        element={<Posts posts={posts} />}
                    ></Route>
                    <Route
                        exact
                        path="/posts/:postid"
                        element={<EditPost posts={posts} setPosts={setPosts}/>}
                    ></Route>
                    <Route
                        exact 
                        path="/posts/create"
                        element={<NewPost  setPosts={setPosts}/>}
                    ></Route>
                </Routes>
            </div>
        </div>
    );
}

export default observer(App);
