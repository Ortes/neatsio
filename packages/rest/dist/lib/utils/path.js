"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = exports.deconstructPath = void 0;
/**
 *
 * @param paths
 */
function deconstructPath(paths) {
    const _paths = [];
    paths.forEach(path => {
        let currentPath = null;
        path.split('.').forEach(function (subpath) {
            currentPath = (currentPath ? currentPath + '.' : '') + subpath.trim();
            _paths.push(currentPath);
        });
    });
    return _paths;
}
exports.deconstructPath = deconstructPath;
/**
 *
 * @param paths
 */
function normalizePath(paths) {
    return paths
        .map(function (path) {
        return path.trim();
    })
        .filter(function (path) {
        return path !== '';
    })
        .filter(function (path, index, self) {
        return self.indexOf(path) === index;
    }); // removes duplicates
}
exports.normalizePath = normalizePath;
//# sourceMappingURL=path.js.map