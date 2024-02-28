import {Database} from './controllers/database.js'
import { randomUUID } from 'node:crypto'
import url from 'node:url'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/talks',
    handle: (req, res) => {
      const parserUrl = url.parse(req.url, true)
      const query = parserUrl.query
      const data = {
        title: query.title ? query.title : null,
        description: query.description ? query.description : null
      }

      let newData = {}
      for(const item in data) {
        if (data[item] !== null){
          newData[item] = data[item]
        } else {
          newData = null
        }
      }
      const result = database.select('talks', newData)

      return res.end(JSON.stringify(result))
    }
  },
  {
    method: 'POST',
    path: '/talks',
    handle: (req, res) => {
      // console.log(req.body)
      const {
        title,
        description,
        completed_at,

      } = req.body

      const data = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at: Date.now(),
        updated_at: Date.now()
      }
      database.insert('talks', data)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: '/talks/:id',
    handle: (req, res) => {
      const parsedUrl = url.parse(req.url, true)

      const path = parsedUrl.pathname

      const id = path.slice(7)
      const {title, description} = req.body
      
      const data = {
        title: title ? title : null,
        description: description ? description : null
      }
      // console.log(data)

      let newData = {}
      for(const item in data) {
        // console.log(data[item])
        if (data[item] !== null){
          newData[item] = data[item]
        }
      }
      console.log(path.slice(7))
      database.update('talks', id, newData)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: '/talks/:id',
    handle: (req, res) => {
      const parsedUrl = url.parse(req.url, true)

      const path = parsedUrl.pathname

      const id = path.slice(7)
      const {completed_at} = req.body
      
      const data = {
        completed: completed_at ? completed_at : null,
      }
      // console.log(data)

     
      console.log(path.slice(7))
      if(data !== null) {
        database.alterar_completed('talks', id, data)
      }

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: '/talks/:id',
    handle: (req, res) => {
      const parsedUrl = url.parse(req.url, true)

      const path = parsedUrl.pathname

      const id = path.slice(7)
      
      // console.log(data)
      console.log(path.slice(7))
      database.delete('talks', id)

      return res.writeHead(201).end()
    }
  }
]

