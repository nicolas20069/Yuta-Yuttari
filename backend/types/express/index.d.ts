import { Multer } from "multer";

declare namespace Express {
  export interface Request {
    file?: Multer.File;
  }
}
