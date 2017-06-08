'use strict';

import {Router} from 'express';

import * as controller from './music.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", auth.isAuthenticated(), controller.index);
//router.get("/my", auth.isAuthenticated(), controller.my);

router.post("/", controller.create);
router.post("/insert/:videoId", auth.isAuthenticated(), controller.videoSearch);
router.put("/:musicId", controller.update);
router.delete("/:musicId", controller.destroy);

export default router;
