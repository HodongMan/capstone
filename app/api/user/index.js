'use strict';

import {Router} from 'express';
import * as controller from './user.controller';


const router = new Router();

router.post("/", controller.create);


module.exports = router;
