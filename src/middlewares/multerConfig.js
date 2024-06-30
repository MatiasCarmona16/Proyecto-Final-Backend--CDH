import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname,join  } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'documents';
        if (file.fieldname === 'profiles') {
            folder = 'profiles';
        } else if (file.fieldname === 'products') {
            folder = 'products';
        } else {
            folder = 'documents';
        }
        cb(null, join(__dirname, `../uploads/${folder}`));
        },


        // Seteamos el nombre del archivo
        filename: function (req, file, cb){
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }
)

export const uploader = multer({
    storage,
    // Si se genera algun error, se captura: 
    onError: function(err, next) {
        console.log(err);
        next()
    }
})