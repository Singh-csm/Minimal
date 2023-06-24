import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Alert,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ReactPlayer from "react-player";


const Singlepost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const fetchPosts = () => {
    api
      .get(`/post/user`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
    setLoading(false);
  }, []);

  const handleDelete = (postId) => {
    api
      .delete(`/post/${postId}`)
      .then((response) => {
        window.alert(response.data.message);
        fetchPosts(); // Call fetchPosts after deleting a post
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  const TruncatedText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length >= maxWords && !show) {
      const truncatedText = words.slice(0, maxWords).join(" ");
      return truncatedText;
    } else {
      return text;
    }
  };

  const download = (postId) => {
    api
      .get(`/post/download/${postId}`)
      .then((response) => {
        console.log(response.data);
        window.open(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const isImageURL = (url) => {
    return /\.(jpeg|JPEG|JPG|img|jpg|gif|png)$/.test(url);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.length > 0 ? (
            data.map((x, i) => {
              const formattedDate = formatDate(x.createdAt);
              const words = x.desc;
              var description = TruncatedText(words, 50);
              return (
                <Card
                  key={x._id}
                  sx={{
                    maxWidth: 580,
                    margin: "auto",
                    marginTop: "100px",
                  }}
                >
                  <CardActionArea>
                    {x.imgURL && isImageURL(x.imgURL) ? (
                      <CardMedia
                        component="img"
                        height="300"
                        image={x.imgURL}
                        alt="Image is about ..."
                      />
                    ) : (
                      <ReactPlayer url={x.imgURL} controls={true} />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {x.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {description}

                        {description.length > 50 ? (
                          <h4
                            onClick={() => {
                              return show ? setShow(false) : setShow(true);
                            }}
                            style={{ textDecoration: "underline" }}
                          >
                            {show ? "view less" : "view more"}
                          </h4>
                        ) : null}
                      </Typography>
                      <Typography
                        style={{ marginTop: "20px" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        posted by {x.user.name} on {formattedDate}
                      </Typography>
                      <Box
                        style={{
                          display: "flex",
                          float: "right",
                          padding: "20px",
                          gap: "20px",
                        }}
                      >
                        <Link to={`/posts/${x._id}`}>
                          <Button variant="contained" color="success">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(x._id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => download(x._id)}
                          variant="contained"
                          color="warning"
                        >
                          download
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          ) : (
            <div style={{ marginTop: "100px" }}>
              {error && (
                <span>
                  <Alert
                    severity="error"
                    onClose={() => {
                      setError("");
                      navigate("/create");
                    }}
                  >
                    you haven't created any posts yet
                  </Alert>
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Singlepost;
