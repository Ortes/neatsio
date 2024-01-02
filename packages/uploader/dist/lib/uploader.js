"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploader = void 0;
const Busboy = require("busboy");
const utils_1 = require("./utils");
const async_wrapper_1 = require("@owliehq/async-wrapper");
const http_errors_1 = require("@owliehq/http-errors");
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
                throw http_errors_1.HttpError.NotFound();
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
                        return reject(http_errors_1.HttpError.NotFound());
                    reject(http_errors_1.HttpError.InternalServerError());
                });
                stream.on('finish', () => resolve(void 0));
                stream.pipe(res);
            });
            try {
                yield promise();
            }
            catch (err) {
                console.log('An error has occured during downloading file...');
                throw http_errors_1.HttpError.UnprocessableEntity();
            }
        });
        return (0, async_wrapper_1.asyncWrapper)(handler);
    }
    /**
     *
     */
    generateKey() {
        return (0, utils_1.foid)(18);
    }
}
exports.Uploader = Uploader;
//# sourceMappingURL=uploader.js.map