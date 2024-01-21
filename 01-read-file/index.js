const fs = require('node:fs');
const path = require('node:path');

const text = 'text.txt';
const filePath = path.join(__dirname, text);

const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

stream.on('data', (chunk) => {
  console.log(chunk);
});
