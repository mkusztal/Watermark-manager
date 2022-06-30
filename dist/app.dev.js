"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Jimp = require('jimp');

var inquirer = require('inquirer');

var fs = require('fs');

var addTextWatermarkToImage = function addTextWatermarkToImage(inputFile, outputFile, text) {
  var image, font, textData;
  return regeneratorRuntime.async(function addTextWatermarkToImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Jimp.read(inputFile));

        case 2:
          image = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Jimp.loadFont(Jimp.FONT_SANS_128_BLACK));

        case 5:
          font = _context.sent;
          textData = {
            text: text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          };
          image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
          _context.next = 10;
          return regeneratorRuntime.awrap(image.quality(100).writeAsync(outputFile));

        case 10:
          console.log('Success! You created watermark');
          startApp();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

var addImageWatermarkToImage = function addImageWatermarkToImage(inputFile, outputFile, watermarkFile) {
  var image, watermark, x, y;
  return regeneratorRuntime.async(function addImageWatermarkToImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Jimp.read(inputFile));

        case 2:
          image = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Jimp.read(watermarkFile));

        case 5:
          watermark = _context2.sent;
          x = image.getWidth() / 2 - watermark.getWidth() / 2;
          y = image.getHeight() / 2 - watermark.getHeight() / 2;
          image.composite(watermark, x, y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.5
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(image.quality(100).writeAsync(outputFile));

        case 11:
          console.log('Success! You created watermark');
          startApp();

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var prepareOutputFilename = function prepareOutputFilename(filename) {
  var _filename$split = filename.split('.'),
      _filename$split2 = _slicedToArray(_filename$split, 2),
      name = _filename$split2[0],
      ext = _filename$split2[1];

  return "".concat(name, "-with-watermark.").concat(ext);
};

var startApp = function startApp() {
  var answer, options, text, image;
  return regeneratorRuntime.async(function startApp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'start',
            message: 'Hi! Welcome to "Watermark manager" Copy your image files to "/img" folder. Then you\'ll be able to use them in the app. Are you ready?',
            type: 'confirm'
          }]));

        case 2:
          answer = _context3.sent;
          // if answer is no, just quit the app
          if (!answer.start) process.exit(); // ask about input file and watermark type

          _context3.next = 6;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'inputImage',
            type: 'input',
            message: 'What file do you want to mark?',
            "default": 'test.jpg'
          }, {
            name: 'watermarkType',
            type: 'list',
            choices: ['Text watermark', 'Image watermark']
          }]));

        case 6:
          options = _context3.sent;

          if (!(options.watermarkType === 'Text watermark')) {
            _context3.next = 15;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'value',
            type: 'input',
            message: 'Type your watermark text: '
          }]));

        case 10:
          text = _context3.sent;
          options.watermarkText = text.value;

          try {
            if (fs.existsSync('/' + options.inputImage)) {
              addTextWatermarkToImage('./img/' + options.inputImage, './img/' + prepareOutputFilename(options.inputImage), options.watermarkText);
            }
          } catch (_unused) {
            console.log("File doesn't exist!");
          }

          _context3.next = 20;
          break;

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'filename',
            type: 'input',
            message: 'Type your watermark name: ',
            "default": 'logo.png'
          }]));

        case 17:
          image = _context3.sent;
          options.watermarkImage = image.filename;

          try {
            if (fs.existsSync('/' + options.inputImage)) {
              addImageWatermarkToImage('./img/' + options.inputImage, './img/' + prepareOutputFilename(options.inputImage), './img/' + options.watermarkImage);
            }
          } catch (_unused2) {
            console.log("File doesn't exist!");
          }

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
};

startApp();