const fs = require('node:fs');
const path = require('node:path');
const prompt = require('prompt-sync')();

const rootfolder = './api';

promptFolderName();
function promptFolderName() {
  const folderName = prompt(
    'Enter name of folder to generate folder structure: '
  );

  const nestedPath = path.join(rootfolder, folderName);

  if (fs.existsSync(nestedPath)) {
    console.log(`folder name ${folderName} already exists`);
    promptFolderName();
    return;
  } else {
    createFile(nestedPath, folderName);
  }
}

function createFile(path, filename) {
  fs.mkdirSync(path, { recursive: true });
  const filestoCreate = [
    `${filename}.Routes.js`,
    `${filename}.Controller.js`,
    `${filename}.Model.js`,
    `${filename}.Validation.js`,
    `${filename}.Middlewear.js`,
  ];

  let remainingFiles = filestoCreate.length;

  filestoCreate.forEach((filename) => {
    fs.writeFile(`${path}/${filename}`, '', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${filename} created.`);
      remainingFiles--;
      if (remainingFiles === 0) {
        ExistApplication();
      }
    });
  });
}

function ExistApplication() {
  const exit = prompt(
    'do  want want to generate new folder structure?, (y to generate /n to exit) '
  );
  if (exit.toLocaleLowerCase() === 'n') {
    console.log('......Exiting');
  } else {
    promptFolderName();
  }
}
