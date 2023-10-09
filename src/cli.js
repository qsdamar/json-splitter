const fs = require("fs");
const yargs = require("yargs");
const path = require("path");

// Define command line arguments
const options = yargs
  .usage("Usage: -f <file> -l <language>")
  .option("f", {
    alias: "file",
    describe: "Path to JSON file",
    type: "string",
    demandOption: true,
  })
  .option("l", {
    alias: "language",
    describe: "Language of a splitting file (Default: en)",
    type: "string",
    demandOption: true,
  });

const filename = path.resolve(options.file);
const fileToSplit = require(filename);

const splittedNames = Object.keys(fileToSplit);

// const dirname = path.dirname(options.file);
// const exportDir = `${dirname}/export`;

const exportDir = `public/localess/${options?.language || "en"}`;

for (let i = 0; i < splittedNames.length; i++) {
  const key = splittedNames[i];
  const fileContent = {
    [key]: fileToSplit[key],
  };

  const fileName = path.resolve(exportDir, `${key}.json`);

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileContent));
  } catch (err) {
    console.error(err);
  }
}

// const dirname = path.dirname(options.file);
// const baseName = path.basename(options.file, ".json");
// const exportDir = `${dirname}/export`;
// const exportName = options.name || baseName;

// // CHECK IF EXPORT FOLDER EXISTS
// if (!fs.existsSync(exportDir)) {
//   fs.mkdirSync(exportDir);
// }

// files.forEach((slice, index) => {
//   const filename = path.resolve(exportDir, `${exportName}-${index}.json`);

//   try {
//     fs.writeFileSync(filename, JSON.stringify(slice));
//   } catch (err) {
//     console.error(err);
//   }

//   console.log(filename);
// });
