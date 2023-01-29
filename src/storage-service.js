import { promises } from 'fs'

const inputPath = './input/input.json'
const outputPath = './output/output.json'

// Check file existence
async function isExist(path) {
   try {
      await promises.stat(path)
      return true
   } catch(e) {
      return false
   }
}

// checking the existence and parsing of the initial data file
async function readInput() {
   if (await isExist(inputPath)) {
      console.log("Conversion of values is performed for the object in the file:", inputPath)
      let data = JSON.parse( await promises.readFile(inputPath) )
      return data.url
   }
   console.log(`ERROR! File with initial data ${inputPath} not found`)
   return undefined
}

// Adding to an existing file or creating a new one
async function saveOutput(outputData) {
   let newData = JSON.stringify(outputData, null ,2)+'\n'
   console.log(newData)
   await promises.writeFile(outputPath, newData,  {'flag':'a'},  (err) => {
      if (err) return console.error(err)
      }
   )
   console.log('JSON result is added to the file', outputPath)
}


export { readInput, saveOutput }
 