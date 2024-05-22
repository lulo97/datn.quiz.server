import multer from "multer";
import path from "path";

const AudioPath = "/public/Audio";
const ImagePath = "/public/Image";

function getDestination(file_type: string) {
    if (file_type === "image") return ImagePath;
    if (file_type === "audio") return AudioPath;
    return "";
}

export const MulterStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const file_type = file.mimetype.split("/")[0];
        let destination = getDestination(file_type);
        if (destination != "") {
            const full_destination = path.join(process.cwd(), destination);
            cb(null, full_destination);
        } else {
            cb(new Error("Field not valid"), "");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
