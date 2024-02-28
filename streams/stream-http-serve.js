import http from 'node:http'

const serve = http.createServer( async (req, res) => {
  const buffer = []

  for await(const chunk of req){
    buffer.push(chunk)
  }

  const fullStream = Buffer.concat(buffer).toString()
  res.end(fullStream)
})

serve.listen(3336, () => console.log('Server stream rodando'))