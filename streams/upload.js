import fs from 'node:fs'
import {Readable, Transform, Writable} from 'node:stream'
import {parse} from 'csv-parse'


// class ReadableStream extends Readable {
//   _read(){
    
//     const buf = Buffer.from(String(readableCsv))
//     console.log(readableCsv)
//     this.push(buf)
//   }
// }
const readableCsv = fs.createReadStream('talks.csv')
const transformCsv = parse({separator: ','})
const transformCsvToString = new Transform({
  objectMode: true,
  // Nesta função estamos transformando o dado, que é representado pelo chunk, em uma string.
  transform(chunk, encoding, callback) {
    callback(null, JSON.stringify(chunk))
  }
})


const writableStream = new Writable({write(chunk, encoding, callback){
  const string = chunk.toString()
  const data = JSON.parse(string)
  fetch('http://localhost:3336', {
    method: 'POST',
    body: data,
    duplex: 'half'
  }).then(response => {
    return response.text()
  }).then(data => {
    console.log(data)
  })
  callback()
}})

console.log('iniciou', Date())
readableCsv
  .pipe(transformCsv)
  .pipe(transformCsvToString)
  .pipe(writableStream)
  // .on('close', () => console.log('FINALIZOU', Date()))