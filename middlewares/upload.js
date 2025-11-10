import multer from 'multer';
import path from "path";

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
});


const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

export default upload;