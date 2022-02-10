import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/loginForm";
import NavBar from "./components/NavBar";
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
                {posts &&
                    posts.map((post) => {
                        return <div key={post._id}>{post.title}</div>;
                    })}
            </div>
        </div>
    );
}

export default observer(App);
