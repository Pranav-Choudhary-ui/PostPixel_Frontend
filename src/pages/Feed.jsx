import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?page=1&limit=10`
        );
        setPosts(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {loading && (
          <div className="text-center text-gray-500">Loading posts...</div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center text-gray-500">
            No posts yet.
          </div>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full object-cover"
              loading="lazy"
            />

            <div className="p-4">
              <p className="text-gray-800">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;