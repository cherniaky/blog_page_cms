import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from ".";
import LoginForm from "./components/loginForm";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import BlogService from "./services/BlogService";
import "./styles/App.css";

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
        return <div className="App">Loading...</div>;
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
                        element={
                            posts &&
                            posts.map((post) => {
                                return (
                                    <Post
                                        key={post._id}
                                        title={post.title}
                                        text={post.text}
                                        date={post.date}
                                        author={post.author}
                                        comments={post.comments}
                                    />
                                );
                            })
                        }
                    ></Route>
                </Routes>
            </div>
        </div>
    );
}

export default observer(App);
