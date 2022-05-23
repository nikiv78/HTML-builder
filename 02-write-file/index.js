const fs = require('fs');
const path = require('path');
const readline = require('readline');


process.on('SIGINT', () => {
  process.stdout.write('Good bye!')
  process.exit(0)
});

const rl = readline.createInterface({
  input: process.stdin
});

const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'), {flags: 'a'});

ws.on('open', () => {
  console.log('Hi! Text:')
});

rl.on('line', (line) => {
  line === 'exit' ? process.emit('SIGINT') : ws.write(line + '\n')
});