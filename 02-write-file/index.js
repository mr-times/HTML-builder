const fs = require('node:fs');
const path = require('node:path');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('node:readline');

const rl = readline.createInterface({ input, output });

const text = 'text.txt';
const filePath = path.join(__dirname, text);

const stream = fs.createWriteStream(filePath, { encoding: 'utf-8', flag: 'a' });

stream.on('open', () => {
  rl.setPrompt('Введите сообщение:');
  rl.prompt();
  rl.on('line', (data) => {
    fs.appendFile(filePath, data, { encoding: 'utf-8' }, () => {});
    if (data === 'exit') {
      rl.setPrompt('Выход');
      rl.prompt();
      process.exit();
    }
  });

  rl.on('SIGINT', () => {
    rl.clearLine();
    rl.setPrompt('Выход');
    rl.prompt();
    process.exit();
  });
});
