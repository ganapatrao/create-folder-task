const fs = require('node:fs');
const path = require('node:path');
const prompt = require('prompt-sync')();

const folderName = 'orders';

const rootfolder = './api';
const nestedPath = path.join(rootfolder, folderName);

if (fs.existsSync(nestedPath)) {
  console.log(`${folderName} already exists`);
  return;
}

fs.mkdirSync(nestedPath, { recursive: true });

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    createFile();
  }
} catch (err) {
  console.error(err);
  return;
}

function createFile() {
  const folderPath = path.join(folderName, '/');

  const filestoCreate = [
    `${folderPath}.Routes.js`,
    `${folderPath}.Controller.js`,
    `${folderPath}.Model.js`,
    `${folderPath}.Validation.js`,
    `${folderPath}.Middlewear.js`,
  ];

  filestoCreate.forEach((filename) => {
    fs.writeFile(filename, '', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File created.');
    });
  });
}
