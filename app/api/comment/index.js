'use strict';

import {Router} from 'express';
import Multer from 'multer';

import * as controller from './comment.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/:boardId", auth.isAuthenticated(), controller.index);
router.get("/user/:user", auth.isAuthenticated(), controller.user);
router.post("/:boardId", auth.isAuthenticated(), controller.create);
router.put("/:commentId", auth.isAuthenticated(), controller.update);

router.delete("/:commentId", controller.destroy);

export default router;
