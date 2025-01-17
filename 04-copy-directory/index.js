const fs = require('node:fs');
const path = require('node:path');
const { readdir } = require('node:fs/promises');

const dirSrc = path.join(__dirname, 'files');
const dirNew = path.join(__dirname, 'files-new');

async function copyFiles(src, dst) {
  const files = await readdir(src, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const name = file.name;
      fs.copyFile(path.join(src, name), path.join(dst, name), () => {});
    }
  }
}

fs.rm(dirNew, { recursive: true, force: true }, () => {
  fs.mkdir(dirNew, { recursive: true }, () => {
    copyFiles(dirSrc, dirNew);
  });
});
