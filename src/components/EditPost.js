import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import "../styles/EditForm.css"

import { Oval } from "react-loader-spinner";

export const EditPost = ({ posts, setPosts }) => {
    const { postid } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [published, setPublished] = useState(false);
    const { store } = useContext(Context);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState("");

    useEffect(async () => {
        setLoading(true);
        let { post } = await store.getPost(postid);
        let { comments } = await store.getPostComments(postid);

        setComments(comments);
        setText(post.text);
        setTitle(post.title);
        setPublished(post.published);
        setAuthor(post.author);
        setLoading(false);
        return () => {};
    }, []);

    if (loading) {
        return (
            <div>
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="edit-post-form-container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    store.updatePost(postid, text, title, author);
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
                        onClick={() => {
                            store.updatePost(postid, text, title, author);
                        }}
                    >
                        Update
                    </button>
                    <button
                        onClick={() => {
                            setPublished(!published);
                            store.togglePublishPost(postid);
                        }}
                    >
                        {published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                        onClick={() => {
                            store.deletePost(postid);
                            // console.log(posts);
                            setPosts(
                                posts.filter((post) => {
                                    if (post._id == postid) {
                                        return 0;
                                    }

                                    return 1;
                                })
                            );
                            navigate("/posts");
                        }}
                        className="delete"
                    >
                        Delete
                    </button>
                </div>
            </form>

            <section className="comment-section card">
                <header>Comments({comments.length})</header>
                {comments.map((comment) => {
                    return (
                        <div className="card" key={comment._id}>
                            <header>{comment.user}</header>
                            {comment.text}
                            <button
                                className="delete"
                                onClick={() => {
                                    setComments(
                                        comments.filter((newComment) => {
                                            if (newComment._id == comment._id) {
                                                return 0;
                                            }

                                            return 1;
                                        })
                                    );
                                    store.deleteComment(postid, comment._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
