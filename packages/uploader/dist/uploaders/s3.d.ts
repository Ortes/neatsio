/// <reference types="node" />
import { Readable } from 'stream';
import { Uploader } from '../uploader';
export declare class S3Uploader extends Uploader {
    private bucket;
    private bucketName;
    private folderName;
    constructor(options: S3Options);
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
export interface S3Options {
    bucket: any;
    bucketName: string;
    folderName: string;
}
