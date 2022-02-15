import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "..";

export const EditPost = ({}) => {
    const { postid } = useParams();

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
        return <>Loading...</>;
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    store.updatePost(postid, text, title, author);
                }}
                className="edit-post-form"
            >
                <label htmlFor="title">Title:</label>
                <input
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    type="text"
                    value={title}
                    name="title"
                />
                <label htmlFor="text">Title:</label>
                <textarea
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    value={text}
                    name="text"
                ></textarea>
                <input type="submit" value="Update" />
                <button
                    onClick={() => {
                        "fd";
                    }}
                >
                    {published ? "Unpublish" : "Publish"}
                </button>
                <button
                    onClick={() => {
                        "fd";
                    }}
                >
                    Delete
                </button>
            </form>

            <section className="comment-section">
                {comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            <header>{comment.user}</header>
                            {comment.text}
                            <button
                                onClick={() => {
                                    return "fd";
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
