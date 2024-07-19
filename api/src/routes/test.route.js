import jwt from "jsonwebtoken";
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken.middleware.js";
import {shouldBeAdmin,shouldBeLoggedIn} from "../controllers/test.controller.js";


const router = Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);

export default router;
