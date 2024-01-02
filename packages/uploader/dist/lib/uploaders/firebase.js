"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseUploader = void 0;
const mime = require("mime-types");
const uploader_1 = require("../uploader");
class FirebaseUploader extends uploader_1.Uploader {
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
exports.FirebaseUploader = FirebaseUploader;
//# sourceMappingURL=firebase.js.map