'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth';


const router = new Router();

router.get("/me", auth.isAuthenticated(), controller.me);
router.get("/music", auth.isAuthenticated(), controller.music);

router.get("/:userId", auth.isAuthenticated(), controller.index);
router.get("/username/:username", auth.isAuthenticated(), controller.user);
router.get("/music/:username",  auth.isAuthenticated(), controller.otherMusic);



router.post("/", controller.create);

router.post("/login", controller.login);
router.post("/image", auth.isAuthenticated(), controller.upload, controller.image);
router.post("/like/:videoId", auth.isAuthenticated(), controller.like);


export default router;
