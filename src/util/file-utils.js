const fs = require("fs");
const rimraf = require("rimraf");

function unlinkSync(path) {
  if (fs.existsSync(path)) {
    rimraf.sync(path);
  }
}

function exists(path) {
  return fs.existsSync(path);
}

function dirExists(path) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

function mkdir(path) {
  if (dirExists(path)) {
    return;
  }
  fs.mkdirSync(path);
}

function parseJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeJson(path, object, indent = 2) {
  let jsonString = JSON.stringify(object, null, indent);
  fs.writeFileSync(path, jsonString, "utf-8");
}

module.exports = {
  unlinkSync: unlinkSync,
  exists: exists,
  dirExists: dirExists,
  mkdir: mkdir,
  parseJSON: parseJSON,
  writeJson: writeJson,
};
