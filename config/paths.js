const path = require('path');
const fs = require('fs');
const url = require('url');
const glob = require('glob');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

/**
 * 入口的声明按照约定优先，“src/app/” 目录下，entry.tsx 均为入口文件，此时将套用 public 目录下的 SPA html 模板。
 * 如果需要更多的自定义支持，需要在根目录 project.json 文件中配置。
 */
const entries = (function() {
    const files = glob.sync('src/app/**/entry.tsx');
    const entries = {};
    const pathDirReg = /^src(\/|\\\\)app(\/|\\\\)(.*?)(\/|\\\\)entry.tsx$/;
    for (const file of files) {
        entries[file.replace(pathDirReg, '$3')] = file;
    }

    const project = require('../project');
    project.entries.forEach(entry => {
        if (entry.outputDir in entries) {
            throw new Error('repeat entry output:' + entry.outputDir);
        }
        entries[entry.outputDir] = entry.tsEntry;
    });
    return entries;
})();

/**
 * 组件的声明按照约定优先，“src/components/” 目录下，所有的 *.tsx 均为组件
 */
const components = (function() {
    return glob.sync('src/components/**/*.tsx');
})();

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJsObj: entries,
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.ts'),
    appNodeModules: resolveApp('node_modules'),
    appTsConfig: resolveApp('tsconfig.json'),
    appTsProdConfig: resolveApp('tsconfig.prod.json'),
    appTsLint: resolveApp('tslint.json'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    componentsPath: components,
    componentsBase: 'src/components/'
};
