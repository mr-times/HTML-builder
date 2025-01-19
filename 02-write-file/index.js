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
    if (data === 'exit') {
      rl.question('Сохранить файл? (y or n)? ', (input) => {
        if (input.match(/^y(es)?$/i)) {
          process.exit();
        }
      });
    } else {
      fs.appendFile(filePath, data, { encoding: 'utf-8' }, () => {});
    }
  });

  rl.on('SIGINT', () => {
    rl.question('Сохранить файл? (y or n)? ', (input) => {
      if (input.match(/^y(es)?$/i)) {
        process.exit();
      }
    });
  });
});
