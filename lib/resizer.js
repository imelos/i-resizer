const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const sizeOf = require('image-size');
const dir = require('node-dir');
const colors = require('colors');

//todo OPTIONAL INPUT OUTPUT AND SIZES
let inputDir = './';
let outputDir = './resized_images';
let defaultSizes = [
  { divider: 1, suffix: '@3x' },
  { divider: 1.5, suffix: '@2x' },
  { divider: 2, suffix: '@1.5x' },
  { divider: 3, suffix: '@1x' },
];

console.log(colors.rainbow('-=== IRESIZER at WORK ===-'))

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
    console.log(colors.yellow('Preparing to process list of files:'));
    files.forEach((file) => {
      console.log(colors.white(file))
    });

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
    defaultSizes.forEach(size => {
      const filename = `${parsedPath.name}${size.suffix}${parsedPath.ext}`;
      const width = Math.ceil(dimensions.width / size.divider);
      const height = Math.ceil(dimensions.height / size.divider);
      sharp(file)
        .resize(width, height)
        .toFile(`${outputDir}/${filename}`);
    })
  });
  console.log(colors.green('Processing done✓'));
  console.log(colors.green(`Output dir:${outputDir}`));
}