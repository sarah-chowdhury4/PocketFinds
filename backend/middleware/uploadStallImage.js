import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'static', 'stall-images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create unique filename: timestamp-uniqueId-originalname
        const stallId = req.params.stallId || 'new';
        // Sanitize the original filename to prevent path traversal attacks
        const sanitizedName = path.basename(file.originalname);
        const uniqueName = `${Date.now()}-${stallId}-${sanitizedName}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    // Only allow image files
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const uploadStallImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

export default uploadStallImage;