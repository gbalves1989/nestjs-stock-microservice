import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function multerConfig(): any {
  const config = {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = uuidv4();
        const extension = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`);
      },
    }),
  };

  return config;
}
