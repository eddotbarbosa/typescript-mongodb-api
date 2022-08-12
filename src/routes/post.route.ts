import {Router} from "express";

import postController from "../controllers/post.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// post CRUD
router.post('/', authMiddleware.authentication, postController.createPost);
router.get('/:post', postController.readPost);
router.put('/', authMiddleware.authentication, postController.updatePost);
router.delete('/', authMiddleware.authentication, postController.deletePost);

// posts list
router.get('/list/:username', postController.postsList);

export default router;
