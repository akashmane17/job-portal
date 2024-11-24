import multer from "multer";

// to store in AWS
export const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

export const fileFilter = (req, file, cb) => {
  if (file.fieldname === "file" && file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
