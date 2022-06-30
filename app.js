const Jimp = require('jimp');
const inquirer = require('inquirer');

const startApp = async () => {
  // Ask if user is ready
  const answer = await inquirer.prompt([
    {
      name: 'start',
      message:
        'Hi! Welcome to "Watermark manager" Copy your image files to "/img" folder. Then you\'ll be able to use them in the app. Are you ready?',
      type: 'confirm',
    },
  ]);

  // if answer is no, just quit the app
  if (!answer.start) process.exit();

  // ask about input file and watermark type
  const options = await inquirer.prompt([
    {
      name: 'inputImage',
      type: 'input',
      message: 'What file do you want to mark?',
      default: 'test.jpg',
    },
    {
      name: 'watermarkType',
      type: 'list',
      choice: ['Text watermark', 'Image watermark'],
    },
  ]);
};

startApp();
