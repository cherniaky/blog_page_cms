import React from 'react'

const Post = ({ title, text, date, author , comments}) => {
    return <div>
        {title}
        {text}
        {author}
        {
            date
        }
        <hr/>   
        {comments.length}
    </div>;
};

export default Post