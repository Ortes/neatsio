'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fsExtra = require('fs-extra');
var path = require('path');
var process = require('process');
var mime = require('mime-types');
var Busboy = require('busboy');
var asyncWrapper = require('@owliehq/async-wrapper');
var httpErrors = require('@owliehq/http-errors');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

let IDX = 36;
let HEX = '';
while (IDX--)
    HEX += IDX.toString(36);
const foid = (len) => {
    var str = '', num = len || 11;
    while (num--)
        str += HEX[(Math.random() * 36) | 0];
    return str;
};

class Uploader {
    constructor() { }
    /**
     *
     */
    get middleware() {
        const handler = (req, res, next) => {
            const busboy = new Busboy({ headers: req.headers });
            //
            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                const key = this.onFileUploadHandler(fieldname, file, filename, encoding, mimetype);
                file.on('end', () => {
                    req.body[fieldname] = key;
                });
            });
            //
            busboy.on('field', (key, value) => {
                req.body[key] = value;
            });
            //
            busboy.on('finish', next);
            //
            req.body = req.body || {};
            //
            req.pipe(busboy);
        };
        return handler;
    }
    /**
     *
     */
    buildDownloadEndpoint(options) {
        const handler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const key = yield options.retrieveKeyCallback(req.params.id);
            if (!key)
                throw httpErrors.HttpError.NotFound();
            const { cache, contentType } = options;
            if (cache && Object.keys(cache).length) {
                cache.maxAge = cache.maxAge || 86400;
                res.set('Cache-Control', `public, max-age=${cache.maxAge}`);
                res.setHeader('Expires', new Date(Date.now() + cache.maxAge).toUTCString());
            }
            if (contentType) {
                res.set({ 'Content-Type': contentType });
            }
            else {
                // TODO: Better handling needed here
                res.attachment((options === null || options === void 0 ? void 0 : options.filename) || key);
            }
            const promise = () => new Promise((resolve, reject) => {
                const stream = this.getStreamFile(key);
                stream.on('error', (err) => {
                    if (err.code === 404)
                        return reject(httpErrors.HttpError.NotFound());
                    reject(httpErrors.HttpError.InternalServerError());
                });
                stream.on('finish', () => resolve(void 0));
                stream.pipe(res);
            });
            try {
                yield promise();
            }
            catch (err) {
                console.log('An error has occured during downloading file...');
                throw httpErrors.HttpError.UnprocessableEntity();
            }
        });
        return asyncWrapper.asyncWrapper(handler);
    }
    /**
     *
     */
    generateKey() {
        return foid(18);
    }
}

/**
 *
 */
class FileSystemUploader extends Uploader {
    constructor(options) {
        var _a;
        super();
        this.uploadTarget = options.uploadTarget;
        this.preserveExtension = (_a = options.preserveExtension) !== null && _a !== void 0 ? _a : true;
    }
    /**
     *
     */
    onFileUploadHandler(fieldname, file, filename, encoding, mimetype) {
        const { path, key } = this.generateStoragePath(mimetype);
        file.pipe(fsExtra.createWriteStream(path));
        return key;
    }
    /**
     *
     * @param key
     */
    getStreamFile(key) {
        return fsExtra.createReadStream(this.retrieveKeyPath(key));
    }
    /**
     *
     */
    onFileDeleteHandler(key) {
        throw new Error('Method not implemented.');
    }
    /**
     *
     */
    generateStoragePath(mimetype) {
        //
        const extension = mime.extension(mimetype);
        //
        const pathWithoutItem = path.join(process.cwd(), typeof this.uploadTarget === 'function' ? this.uploadTarget() : this.uploadTarget);
        //
        fsExtra.ensureDirSync(pathWithoutItem);
        //
        const key = this.generateKey().toString() + (this.preserveExtension && extension ? `.${extension}` : '');
        //
        return {
            path: path.join(pathWithoutItem, key),
            key
        };
    }
    /**
     *
     * @param key
     */
    retrieveKeyPath(key) {
        const pathWithoutItem = path.join(process.cwd(), typeof this.uploadTarget === 'function' ? this.uploadTarget() : this.uploadTarget);
        return path.join(pathWithoutItem, key);
    }
}

class FirebaseUploader extends Uploader {
    constructor(options) {
        var _a;
        super();
        this.bucket = options.bucket;
        this.preserveExtension = (_a = options.preserveExtension) !== null && _a !== void 0 ? _a : true;
    }
    /**
     *
     */
    onFileUploadHandler(fieldname, file, filename, encoding, mimetype) {
        const extension = mime.extension(mimetype);
        const key = this.generateKey().toString() + (this.preserveExtension && extension ? `.${extension}` : '');
        const fileUpload = this.bucket.file(key);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: mimetype
            }
        });
        file.pipe(blobStream);
        return key;
    }
    /**
     *
     * @param key
     */
    getStreamFile(key) {
        return this.bucket.file(key).createReadStream();
    }
    /**
     *
     */
    onFileDeleteHandler(key) {
        throw new Error('Method not implemented.');
    }
}

class S3Uploader extends Uploader {
    constructor(options) {
        super();
        this.bucket = options.bucket;
        this.bucketName = options.bucketName;
        this.folderName = options.folderName;
    }
    /**
     *
     */
    onFileUploadHandler(fieldname, file, filename, encoding, mimetype) {
        const extension = mime.extension(mimetype);
        const key = `${this.generateKey().toString()}.${extension}`;
        const params = {
            Bucket: this.bucketName,
            Key: `${this.folderName}/${key}`,
            Body: file
        };
        const data = this.bucket.upload(params, (err, data) => {
            if (err) {
                console.log('err', err);
            }
        });
        return key;
    }
    /**
     *
     * @param key
     */
    getStreamFile(key) {
        const params = { Bucket: this.bucketName, Key: `${this.folderName}/${key}` };
        return this.bucket.getObject(params).createReadStream();
    }
    /**
     *
     */
    onFileDeleteHandler(key) {
        throw new Error('Method not implemented.');
    }
}

exports.FileSystemUploader = FileSystemUploader;
exports.FirebaseUploader = FirebaseUploader;
exports.S3Uploader = S3Uploader;
exports.Uploader = Uploader;
//# sourceMappingURL=index.js.map
