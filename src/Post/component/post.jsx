import React from 'react'

const Post = (props) => (
    <div className="forum">
        {
            props.postBody.map((postPart, idx) => (
                <div>{postPart}</div>
            ))
        }
    </div>
);

export default Post;