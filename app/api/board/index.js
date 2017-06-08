'use strict';

import {Router} from 'express';

import * as controller from './board.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);
router.get("/hot", auth.isAuthenticated(), controller.hot);
router.get("/:boardId", auth.isAuthenticated(), controller.show);

router.get("/festival/:fesitvalId", auth.isAuthenticated(), controller.festival);
router.get("/festival/hot/:fesitvalId", auth.isAuthenticated(), controller.festivalHot);
router.get("/festival/:fesitvalId/tag/:tagName", auth.isAuthenticated(), controller.festival);
router.get("/user/:user", auth.isAuthenticated(), controller.user);
router.get("/search/:search", controller.search);

router.post("/", auth.isAuthenticated(), controller.create);
router.post("/image/:boardId", auth.isAuthenticated(), controller.upload ,controller.image);


router.put("/:boardId", auth.isAuthenticated(), controller.update);
router.delete("/:boardId", auth.isAuthenticated(), controller.destroy);

export default router;
