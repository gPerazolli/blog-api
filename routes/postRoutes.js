const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.get('/search', postController.searchPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);


module.exports = router;