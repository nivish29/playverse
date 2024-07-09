import express from "express";
const router = express.Router();
import { convertToMp3 } from "../controller/findText.controller.js";

router.get("/convertToMp3", convertToMp3);

export default router;
