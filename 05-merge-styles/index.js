const fs = require('node:fs');
const path = require('node:path');
const { readdir } = require('node:fs/promises');

const destPath = path.join(__dirname, 'project-dist', 'bundle.css');
const srcPath = path.join(__dirname, 'styles');

async function mergeFiles(src, dst) {
  fs.writeFile(dst, '', () => {});
  const files = await readdir(src, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && path.extname(path.join(src, file.name)) === '.css') {
      fs.createReadStream(path.join(src, file.name), { encoding: 'utf-8' }).on(
        'data',
        (chunk) => {
          fs.appendFile(dst, chunk, { encoding: 'utf-8' }, () => {});
        },
      );
    }
  }
}

mergeFiles(srcPath, destPath);
