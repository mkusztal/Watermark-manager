"use strict";

var Jimp = require('jimp');

var inquirer = require('inquirer');

var startApp = function startApp() {
  var answer, options;
  return regeneratorRuntime.async(function startApp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'start',
            message: 'Hi! Welcome to "Watermark manager" Copy your image files to "/img" folder. Then you\'ll be able to use them in the app. Are you ready?',
            type: 'confirm'
          }]));

        case 2:
          answer = _context.sent;
          // if answer is no, just quit the app
          if (!answer.start) process.exit(); // ask about input file and watermark type

          _context.next = 6;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'inputImage',
            type: 'input',
            message: 'What file do you want to mark?',
            "default": 'test.jpg'
          }, {
            name: 'watermarkType',
            type: 'list',
            choice: ['Text watermark', 'Image watermark']
          }]));

        case 6:
          options = _context.sent;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

startApp();