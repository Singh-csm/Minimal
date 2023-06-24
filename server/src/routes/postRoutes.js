const { verifyToken, verifyTokenAndAuthorization } = require("../auth/auth");
const {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostsById,
  editPost,
  deletePost,
  downloadFile,
} = require("../controller/postController");

const router = require("express").Router();

router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.get("/user", verifyToken, getPostsByUserId);
router.get("/:postId", verifyTokenAndAuthorization, getPostsById);
router.put("/:postId", verifyTokenAndAuthorization, editPost);
router.delete("/:postId", verifyTokenAndAuthorization, deletePost);
router.get("/download/:postId", verifyTokenAndAuthorization, downloadFile);

module.exports = router;
