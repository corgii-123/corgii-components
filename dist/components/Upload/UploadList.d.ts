import { FC } from 'react';
import { UploadFile } from './Upload';
interface UploadlistProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
declare const UploadList: FC<UploadlistProps>;
export default UploadList;
