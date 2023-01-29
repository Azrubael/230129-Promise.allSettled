import fetch from 'node-fetch'
import { readInput, saveOutput } from './storage-service.js'

const db_url = 'https://opentdb.com/api.php?type=multiple&amount=1&category='

console.log('This is a small application that fetches three random questions\n from the Open Trivia Database')

// Reading the input data
const input = await readInput()

// Fetch question in all categoried (multiple asynchronous Promises)
const qRes = await Promise.allSettled(
   input.map( item => { 
      const key = Object.keys(item)[0]
      item[key] = db_url + item[key]
      return fetch( item[key])
      }
   )
)

// Convert JSON to object (multiple asynchronous Promises)
const qObj = await Promise.allSettled(
   qRes
      .filter ( q => q && q.status == 'fulfilled' && q.value )
      .map( q => q.value.json() )
)

// Get first result and filter failures
const qData = qObj
   .filter(  q => q && q.status == 'fulfilled' && q.value && q.value.results && q.value.results[0] )
   .map( q => q.value.results[0] )

for (let i = 0 ; i < input.length; i++) {
   input[i]['data'] = qData[i]
}

console.log(`fetched ${ qData.length } valid questions:`)

saveOutput(input)