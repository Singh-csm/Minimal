const postModel = require("../models/postModel");
const {
  postValidation,
  postUpdateValidation,
} = require("../validation/schemaValidation");

const { uploadFile } = require("./aws");

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    const { title, desc } = data;
    const userId = req.tokenDetails.userId;
    let imgURL;
    const { error, value } = await postValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (files.length > 0) {
      for (let i of files) {
        if (i.fieldname == "imgURL") {
          imgURL = await uploadFile(i);
        }
      }
    }
    const post = {
      title: title,
      desc: desc,
      imgURL: imgURL,
      user: userId,
    };

    const create = await postModel.create(post);

    return res
      .status(201)
      .json({ data: create, message: "post created successfully" });
  } catch (error) {
    console.log("error in createPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user").sort({ _id: -1});

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ data: posts });
  } catch (error) {
    console.log("error in createPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const userId = req.tokenDetails.userId;
    const posts = await postModel.find({ user: userId }).populate("user");

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ data: posts });
  } catch (error) {
    console.log("error in createPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getPostsById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const posts = await postModel.findOne({ _id: postId });

    if (!posts) {
      return res.status(404).json({ message: "No post found" });
    }
    return res.status(200).json({ data: posts });
  } catch (error) {
    console.log("error in createPost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    const { title, desc } = data;
    const postId = req.params.postId;
    let imgURL;
    const { error, value } = await postUpdateValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let updatePost = {};
    if (files.length > 0) {
      for (let i of files) {
        if (i.fieldname == "imgURL") {
          imgURL = await uploadFile(i);
          updatePost.imgURL = imgURL;
        }
      }
    }
    if (title) {
      updatePost.title = title;
    }
    if (desc) {
      updatePost.desc = desc;
    }

    const update = await postModel.findOneAndUpdate(
      { _id: postId },
      updatePost,
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: "No post found" });
    }
    return res
      .status(201)
      .json({ data: update, message: "post Updated successfully" });
  } catch (error) {
    console.log("error in editpost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await postModel.findOneAndDelete({ _id: req.params.postId });
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log("error in editpost", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    let postId = req.params.postId;
    let post = await postModel.findOne({ _id: postId });
    //console.log(post.imgURL);
    return res.status(200).send(post.imgURL);
  } catch (error) {
    console.log("error in download", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostsById,
  editPost,
  deletePost,
  downloadFile,
};
