import express, { Request, Response, Router } from "express";
import { register } from "../controllers/auth.cotroller";
import { getDataFromIpfs } from "../databaseManagement/fromDir";

const router: Router = express.Router();

router.get("/", getDataFromIpfs);
router.get("/login", register);

export default router;
