import React, { useState } from "react";
import "./create.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { api } from "../../api/api";

const Createpost = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("imgURL", image);

    setError("");
    setLoading(true);

    api
      .post(`/post`, formData)
      .then((response) => {
        console.log(response.data.data);
        window.alert("file created successfully");
        setLoading(false);
        navigate("/posts");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        setLoading(false);
      });
  }

  return (
    <div className="post-container">
      <div className="post">
        <div className="title">
          <span>Create Your Post</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Title</span>
            <input type="text" required placeholder="title" name="title" />
            <span>Description</span>
            <input type="text" placeholder="description" name="desc" />
            <span>
              Add image/video <h6>(optional)</h6>
            </span>
            <input
              className="file"
              type="file"
              placeholder="select image"
              name="imgURL"
              onChange={handleImageChange}
            />
            <button type="submit" disabled={loading}>
              Create
            </button>
          </div>
        </form>
        {loading && <CircularProgress />}{" "}
        {/* Display the progress bar while loading */}
        {error && (
          <span>
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          </span>
        )}
      </div>
    </div>
  );
};

export default Createpost;
