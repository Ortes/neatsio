/// <reference types="node" />
import { Readable } from 'stream';
import { Uploader } from '../uploader';
export declare class FirebaseUploader extends Uploader {
    private bucket;
    private preserveExtension;
    constructor(options: FirebaseOptions);
    /**
     *
     */
    onFileUploadHandler(fieldname: string, file: Readable, filename: string, encoding: string, mimetype: string): string;
    /**
     *
     * @param key
     */
    getStreamFile(key: string): Readable;
    /**
     *
     */
    onFileDeleteHandler(key: string): void;
}
export interface FirebaseOptions {
    bucket: any;
    preserveExtension?: boolean;
}
