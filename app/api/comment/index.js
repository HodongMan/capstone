'use strict';

import {Router} from 'express';

import * as controller from './comment.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/:boardId", controller.index);
router.post("/", controller.create);
router.put("/:commentId", controller.update);
router.delete("/:commentId", controller.destroy);

export default router;
