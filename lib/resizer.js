const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const sizeOf = require('image-size');
const dir = require('node-dir');

let inputDir = './';
let outputDir = './resized_images';
let defaultSizes = [
  { divider: 1, suffix: '@3x' },
  { divider: 1.5, suffix: '@2x' },
  { divider: 2, suffix: '@1.5x' },
  { divider: 3, suffix: '@1x' },
];

exports.resize = function() {
  return '-=== IM RESIZER ===-';
};

//scan dir for images
dir.readFiles(
  inputDir,
  {
    match: /.*\.(gif|png|jpe?g)$/i,
    recursive: false,
  },
  function(err, content, next) {
    if (err) throw err;
    // console.log('content:', content);
    next();
  },
  function(err, files) {
    if (err) throw err;
    console.log('finished reading files:', files);

    resizeImages(files)
  },
);


function resizeImages(files, output) {
  // create output dir if it does not exist
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }
  files.forEach(file => {
    const parsedPath = path.parse(file);
    const dimensions = sizeOf(file);
    console.log(dimensions.width, dimensions.height);
    console.log(parsedPath);
    sharp(file)
      .resize(30, 30)
      .toFile(`${outputDir}/resized-${file}`);
  });
}