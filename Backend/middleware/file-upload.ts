import multer from "multer";
import { v4 as uuid } from "uuid";

const MIME_TYPE_MAP: Record<string, string> = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileSizeLimit: { fileSize: number } = {
  fileSize: 500000,
};

const fileUpload = multer({
  limits: fileSizeLimit,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext: string = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid: boolean = !!MIME_TYPE_MAP[file.mimetype];
    if (isValid) {
      cb(null, true);
    } else {
      cb(null, false);
      new Error("Invalid mime type!");
    }
  },
});

export default fileUpload;
