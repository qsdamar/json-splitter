const fs = require('fs')
const yargs = require('yargs')
const path = require('path')

// Define command line arguments
const options = yargs
  .usage('Usage: --f <file> --lg <language>')
  .option('f', {
    alias: 'file',
    describe: 'Path to JSON file',
    type: 'string',
    demandOption: true,
  })
  .option('lg', {
    alias: 'language',
    default: 'en',
    describe: 'Language of a splitting file (Default: en)',
    type: 'string',
  }).argv

const filename = path.resolve(options.file)
const fileToSplit = require(filename)

const splittedNames = Object.keys(fileToSplit) // e.g. ["about", "album", "user"]
const language = options.language || 'en'
const exportDir = `public/locales/${language}`

// check if export folder exists
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true })
}

let filesCreatedCount = 0

for (let i = 0; i < splittedNames.length; i++) {
  const key = splittedNames[i]
  const fileContent = { [key]: fileToSplit[key] }

  const fileName = path.resolve(exportDir, `${key}.json`)

  try {
    fs.writeFileSync(fileName, JSON.stringify(fileContent, null, 2))
    ++filesCreatedCount
  } catch (err) {
    console.error(err)
  }
}

console.log(`Created ${filesCreatedCount} files for \`${language}\` language.`)
