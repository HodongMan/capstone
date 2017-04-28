'use strict';

import {Router} from 'express';

import * as controller from './festival.controller';
import * as auth from '../../auth/auth';

const router = new Router();

router.get("/", controller.index);
router.get("/:festivalId", controller.show);
router.post("/", controller.create);
router.put("/:festivalId", controller.update);
router.delete("/:festivalId", controller.destroy);

module.exports = router;
