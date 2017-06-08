'use strict';

import {Router} from 'express';

import * as controller from './music.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);



router.post("/", controller.create);
router.post("/search/:videoId", controller.videoSearch);
router.put("/:musicId", controller.update);
router.delete("/:musicId", controller.destroy);

export default router;
