import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { api } from "../api/api";

const Posts = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    api
      .get(`/post`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
        console.log(error);
        setError(error.response.data.message);
      });
  }, []);

  const TruncatedText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length >= maxWords && !show) {
      const truncatedText = words.slice(0, maxWords).join(" ");
      return truncatedText;
    } else {
      return text;
    }
  };

  const isImageURL = (url) => {
    return /\.(jpeg|JPEG|JPG|img|jpg|gif|png)$/.test(url);
  };

  return (
    <div>
      {data.length > 0 &&
        data.map((x, i) => {
          const formattedDate = formatDate(x.createdAt);
          const words = x.desc;
          var description = TruncatedText(words, 50);
          return (
            <>
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
                      alt="Image is about ...minimal dot assignment"
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
                          style={{ textDecoration: "underlined" }}
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
                  </CardContent>
                </CardActionArea>
              </Card>
              ;
            </>
          );
        })}
    </div>
  );
};

export default Posts;
