import React from 'react'
import Post from './Post';
import "../styles/Posts.css"

export const Posts = ({posts}) => {
  return (
      <div className='posts-grid'>
          {posts &&
              posts.map((post) => {
                  return (
                      <Post
                          key={post._id}
                          id={post._id}
                          title={post.title}
                          text={post.text}
                          date={post.date}
                          author={post.author}
                          comments={post.comments}
                      />
                  );
              })}
      </div>
  );
}
