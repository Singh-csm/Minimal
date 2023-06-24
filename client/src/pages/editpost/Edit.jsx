import React, { useEffect, useState } from "react";
import "./edit.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
import { api } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";

const Edit = () => {
  const params = useParams();
  const postId = params.id;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0].name);
  };

  const onChangeHandle = (e) => {
    setSingleData({ ...singleData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    api
      .get(`/post/${postId}`)
      .then((response) => {
        console.log(response.data.data);
        setSingleData(response.data.data);
        setImage(response.data.data.imgURL);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("imgURL", image);
    setError("");
    setLoading(true);

    api
      .put(`/post/${postId}`, formData)
      .then((response) => {
        console.log(response.data.data);
        window.alert(response.data.message);
        setSingleData({ title: "", desc: "" });
        setImage("");
        setLoading(false);
        navigate("/posts");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        console.log(error.response.data.message);
      });
  }

  return (
    <div className="post-container">
      <div className="edit-post">
        <div className="title">
          <span>Update Your Post</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Title </span>
            <input
              type="text"
              required
              placeholder="title"
              name="title"
              value={singleData.title}
              onChange={onChangeHandle}
            />
            <span>
              Description <h6>(optional)</h6>
            </span>
            <input
              type="text"
              placeholder="description"
              name="desc"
              value={singleData.desc}
              onChange={onChangeHandle}
            />
            <span>
              Add image <h6>(optional)</h6>
            </span>
            <img
              style={{ height: "60px", width: "60px" }}
              src={image}
              alt=""
              srcset=""
            />
            <input
              className="file"
              type="file"
              placeholder="select image"
              name="imgURL"
              onChange={handleImageChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>

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

export default Edit;
