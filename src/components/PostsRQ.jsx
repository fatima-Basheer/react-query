import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchPosts = () => {
  return axios.get("http://localhost:3000/posts");
};

const addPost = (post) => {
  return axios.post("http://localhost:3000/posts", post);
};

function PostsRQ() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime:30000
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    // enabled: false,
  });

  const { mutate } = useMutation({
    mutationFn: addPost,
    // onSuccess: (newData) => {
    //   // QueryClient.invalidateQueries("posts")
    //   queryClient.setQueryData(["posts"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data],
    //     };
    //   });
    // },
  });

  //   const { mutate:updatePostMutation } = useMutation({
  //   mutationFn: addPost,
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, body });
    const post = { title, body };

    mutate(post);
    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Post title"
          value={title}
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter Post title"
          value={body}
        />
        <button type="submit">Post</button>
      </form>
      <button onClick={refetch}>Show Data</button>
      {data?.data.map((post) => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>
          <div className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostsRQ;
// query by id
//create a RQPostDetails
//configuring the route for the newly created page-(rq-posts/{postId})
//wrapping each element with the <a> tag
