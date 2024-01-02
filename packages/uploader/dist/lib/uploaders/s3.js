"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Uploader = void 0;
const mime = require("mime-types");
const uploader_1 = require("../uploader");
class S3Uploader extends uploader_1.Uploader {
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
exports.S3Uploader = S3Uploader;
//# sourceMappingURL=s3.js.map