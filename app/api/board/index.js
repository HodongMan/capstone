'use strict';

import {Router} from 'express';

import * as controller from './board.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);
router.get("/:boardId", controller.show);
router.get("/festival/:fesitvalId", controller.festival);
router.get("/festival/:fesitvalId/tag/:tagName", controller.festival);
router.get("/user/:user", controller.user);
router.post("/", controller.create);

router.put("/:boardId", controller.update);
router.delete("/:boardId", controller.destroy);

export default router;
