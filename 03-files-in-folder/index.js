const fs = require('node:fs');
const path = require('node:path');
const { readdir } = require('node:fs/promises');

const dirPath = path.join(__dirname, 'secret-folder');

async function listFiles(dirPath) {
  const files = await readdir(dirPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const name = file.name.split('.')[0];
      const ext = path.extname(path.join(dirPath, file.name)).slice(1);
      fs.stat(path.join(dirPath, file.name), (err, stats) => {
        const size = (stats.size / 1024).toFixed(3);
        console.log(`${name} - ${ext} - ${size} kb`);
      });
    }
  }
}

listFiles(dirPath);
