'use strict';

import {Router} from 'express';

import * as controller from './musicrank.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", auth.isAuthenticated(), controller.index);
router.get("/my", auth.isAuthenticated(), controller.my);
router.post("/update", controller.update);
router.post('/like/:musicrankId', auth.isAuthenticated(), controller.like);

export default router;
