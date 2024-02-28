import http from 'node:http'
import { Url } from 'node:url'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const serve = http.createServer( async(req, res) => {
  const {method} = req

  await json(req, res)
  const route = routes.find(route => {
    return route.method === method
  })

  if (route) {
    return route.handle(req, res)
  }

  return res.writeHead(201).end()
})

serve.listen(3335, () => console.log('Servidor rodando!'))