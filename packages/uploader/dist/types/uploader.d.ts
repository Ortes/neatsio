/// <reference types="node" />
import { Readable } from 'stream';
import { RequestHandler } from 'express';
export declare abstract class Uploader {
    constructor();
    /**
     *
     */
    get middleware(): RequestHandler;
    /**
     *
     */
    buildDownloadEndpoint(options: DownloadEndpointOptions): RequestHandler;
    abstract onFileUploadHandler(fieldname: string, file: Readable, filename: string, encoding: string, mimetype: string): string;
    /**
     *
     */
    abstract onFileDeleteHandler(key: string): void;
    /**
     *
     */
    abstract getStreamFile(key: string): Readable;
    /**
     *
     */
    protected generateKey(): string;
}
/**
 *
 */
export interface DownloadEndpointOptions {
    filename?: string;
    contentType?: string;
    cache?: {
        maxAge?: number;
    };
    retrieveKeyCallback(id: any): Promise<string | undefined>;
}
