import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", e.target.caption.value);

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/create-post`,
        formData
      );

      navigate("/feed");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Upload Area */}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />

            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
                ${preview ? "border-green-500" : "border-gray-300 hover:border-green-400"}`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-lg mx-auto max-h-60 object-cover"
                />
              ) : (
                <>
                  <p className="text-gray-600 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </label>

          {/* Caption */}
          <input
            type="text"
            name="caption"
            placeholder="Write a caption..."
            required
            maxLength={300}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition 
              ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;