'use strict';

import {Router} from 'express';

import * as controller from './board.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", auth.isAuthenticated(), controller.index);
router.get("/:boardId", auth.isAuthenticated(), controller.show);
router.get("/festival/:fesitvalId", auth.isAuthenticated(), controller.festival);
router.get("/festival/:fesitvalId/tag/:tagName", auth.isAuthenticated(), controller.festival);
router.get("/user/:user", auth.isAuthenticated(), controller.user);
router.post("/", auth.isAuthenticated(), controller.create);

router.put("/:boardId", auth.isAuthenticated(), controller.update);
router.delete("/:boardId", auth.isAuthenticated(), controller.destroy);

export default router;
