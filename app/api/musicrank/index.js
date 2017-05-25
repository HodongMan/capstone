'use strict';

import {Router} from 'express';

import * as controller from './musicrank.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);
router.post("/update", controller.update);
//router.post('/like:musicrankId', controller.like);

export default router;
