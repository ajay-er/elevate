import path from 'path';

import multer from 'multer';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.size > 2 * 1024 * 1024) {
        const fileSizeError = new Error('File size limit exceeded (2MB)');
        fileSizeError.name = 'FileUploadError';
        cb(fileSizeError, false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: fileFilter,
});

export {upload};