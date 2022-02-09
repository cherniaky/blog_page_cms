import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/loginForm";
import BlogService from "./services/BlogService";
import "./styles/App.css";

function App() {
    const { store } = useContext(Context);
    const [posts, setPosts] = useState([]);
    
    useEffect(async () => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    if (!store.isAuth) {
        return (
            <>
                <LoginForm />
            </>
        );
    }

    return (
        <div className="App">
            <h1> Is auth </h1>

            <button
                onClick={async () => {
                    let postsres = await BlogService.getPosts();
                    console.log(postsres.data.posts);
                    setPosts(postsres.data.posts);
                }}
            >
                Get posts
            </button>

                
            {posts.map((post) => {
                <div>
                    post
                    {post.title}
                </div>;
            })}
        <hr/>
            <button onClick={() => store.logout()}>Log out</button>
        </div>
    );
}

export default observer(App);
