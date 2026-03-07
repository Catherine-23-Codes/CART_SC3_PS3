import multer from 'multer';
import path from 'path';

// Define the temporary upload storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tempImages/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer
const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    // Regular expression to check extension
    const filetypes = /jpeg|jpg|png|webp|svg|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) || !path.extname(file.originalname);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error("Only images are allowed (jpg, jpeg, png, svg, webp)"));
  }
});

export default uploadMiddleware;
