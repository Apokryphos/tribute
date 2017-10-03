//  Script for building production images.
//  Original size images are kept under src/img
//  Processed images are output to intermediate/img
//  Webpack copies processed images to final location.
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const inputPath = path.join(process.cwd(), './src/img/');
const outputPath = path.join(process.cwd(), './intermediate/img/');

function createJob(path, height) {
  return {
    //  Target height. Aspect ratio will be maintained
    height,
    //  Subdirectory from input path (if any)
    path,
    getOutputDirectory: function() {
      return `${outputPath}${path}`;
    }
  };
}

const imageJobs = [
  createJob('', 800),
  createJob('panels', 600),
  createJob('timeline', 400)
];

function resize(job, file) {
  const outputDirectory = job.getOutputDirectory();
  const input = `${inputPath}${job.path}/${file}`;
  const output = `${outputDirectory}/${file}`;

  console.log(`${input} -> ${output}`);

  sharp(input)
    .withoutEnlargement(true)
    .resize(null, job.height)
    .toFile(output)
    .catch(err => {
      console.error(`Error resizing ${input}.`);
      console.error(err);
    });
}

function runJob(job) {
  const imagesPath = `./src/img/${job.path}/`;

  //  Create output directory if it doesn't exist
  fs.ensureDir(job.getOutputDirectory(), err => {
    if (err) {
      console.error(err);
      return;
    }

    //  Get files in input directory and process
    fs.readdir(imagesPath, (err, files) => {
      files.forEach(file => {
        const extension = path.extname(file);

        //  Only resize matching extensions
        if (extension === '.jpg' || extension === '.png') {
          resize(job, file);
        }
      });
    });
  });
}

//  Run jobs
for (let j = 0; j < imageJobs.length; ++j) {
  runJob(imageJobs[j]);
}
