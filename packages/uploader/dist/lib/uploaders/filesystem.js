"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemUploader = void 0;
const fs_extra_1 = require("fs-extra");
const path = require("path");
const process = require("process");
const mime = require("mime-types");
const uploader_1 = require("../uploader");
/**
 *
 */
class FileSystemUploader extends uploader_1.Uploader {
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
        file.pipe((0, fs_extra_1.createWriteStream)(path));
        return key;
    }
    /**
     *
     * @param key
     */
    getStreamFile(key) {
        return (0, fs_extra_1.createReadStream)(this.retrieveKeyPath(key));
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
        (0, fs_extra_1.ensureDirSync)(pathWithoutItem);
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
exports.FileSystemUploader = FileSystemUploader;
//# sourceMappingURL=filesystem.js.map