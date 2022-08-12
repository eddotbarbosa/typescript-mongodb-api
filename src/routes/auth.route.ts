import {Router} from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();


// sign in and sign out
router.post('/signin', authController.signIn);
router.post('/signout', authMiddleware.authentication, authController.signOut);

// me
router.get('/me', authMiddleware.authentication, authController.me);

export default router;
