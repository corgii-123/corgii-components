import { FC } from 'react';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (data: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    label?: string;
}
declare const Upload: FC<UploadProps>;
export default Upload;
