const fs = require('node:fs');
const path = require('node:path');
const { readdir } = require('node:fs/promises');

const dirSrc = path.join(__dirname, 'files');
const dirNew = path.join(__dirname, 'files-new');
/*
function dir(params) {
  return path.join(__dirname, params);
}
*/
async function copyFiles(src, dst) {
  const files = await readdir(src, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const name = file.name;
      fs.copyFile(path.join(src, name), path.join(dst, name), () => {});
    }
  }
}

fs.mkdir(dirNew, { recursive: true }, () => {
  copyFiles(dirSrc, dirNew);
});
