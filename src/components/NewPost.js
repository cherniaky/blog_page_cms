import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import BlogService from "../services/BlogService";

export const NewPost = ({setPosts}) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const { store } = useContext(Context);

    const navigate = useNavigate();

    return (
        <div className="edit-post-form-container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // store.updatePost(postid, text, title);
                }}
                className="edit-post-form card"
            >
                <div className="form-group">
                    <label className="titlel" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="edit-form-input title"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        value={title}
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <textarea
                        className="edit-form-input text"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        value={text}
                        name="text"
                    ></textarea>
                </div>
                <div className="edit-buttons card-bottom">
                    <button
                        onClick={async () => {
                            await store.createPost(title, text);
                            let postsres = await BlogService.getPosts();

                            setPosts(postsres.data.posts);
                            navigate("/posts");
                            //store.updatePost(postid, text, title, author);
                        }}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};
