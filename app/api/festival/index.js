'use strict';

import {Router} from 'express';
import Multer from 'multer';
import path from 'path';

import * as controller from './festival.controller';
import * as auth from '../../auth/auth';


const router = new Router();

router.get("/", controller.index);
router.get("/:festivalId", controller.show);
router.post("/", controller.create);
router.post("/:festivalId/icon",controller.imgUpload);
router.put("/:festivalId", controller.update);
router.delete("/:festivalId", controller.destroy);

export default router;
