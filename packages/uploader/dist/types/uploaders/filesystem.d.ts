/// <reference types="node" />
import { Readable } from 'stream';
import { Uploader } from '../uploader';
/**
 *
 */
export declare class FileSystemUploader extends Uploader {
    private uploadTarget;
    private preserveExtension;
    constructor(options: FileSystemOptions);
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
    /**
     *
     */
    private generateStoragePath;
    /**
     *
     * @param key
     */
    private retrieveKeyPath;
}
export interface FileSystemOptions {
    uploadTarget: string | Function;
    preserveExtension?: boolean;
}
