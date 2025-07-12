import fs from 'fs';
import { TFile } from '../interface';

const deleteFile = (file?: TFile) => {
    const filePath = file?.path;
    if (filePath) {
        fs.unlinkSync(filePath);
    }
};

export default deleteFile;
