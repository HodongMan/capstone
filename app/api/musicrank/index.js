'use strict';

import {Router} from 'express';

import * as controller from './musicrank.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);
router.get("/video/:artist/:title", controller.video);
router.get("/videosearch/:search", controller.videoSearch);

router.post("/update", controller.update);

export default router;
