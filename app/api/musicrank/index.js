'use strict';

import {Router} from 'express';

import * as controller from './musicrank.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", auth.isAuthenticated(), controller.index);
router.get("/test", auth.isAuthenticated(), controller.test);
router.get("/my", auth.isAuthenticated(), controller.my);
router.get("/like/:name", auth.isAuthenticated(), controller.likeMusic);
router.get("/video/:artist/:title", controller.video);
router.get("/videosearch/:search", controller.videoSearch);

router.post("/update", controller.update);
router.post('/like/:musicrankId', auth.isAuthenticated(), controller.like);
router.delete('/like/:musicrankId', auth.isAuthenticated(), controller.unlike);

export default router;
