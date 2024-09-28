import express from "express";
import { uploadImg } from "../utils/checkUpload.js";
import * as ImageUploadController from "../controllers/ImageUploadControllers.js";

const router = express.Router();

router.post('/upload', uploadImg.single('image'), ImageUploadController.uploadImg);

export default router;