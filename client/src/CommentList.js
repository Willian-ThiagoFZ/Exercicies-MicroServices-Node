import React, { useState, useEffect } from "react";
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const getCommnetsByPost = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  }

  useEffect(() => {
    getCommnetsByPost();
  }, []);

  const commentsRenderd = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <>
    <p>{comments.length} Comments</p>
    <ul>
      {commentsRenderd}
    </ul>
  </>;
};
 
export default CommentList;