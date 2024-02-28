import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  database = {}
  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {

      this.database = JSON.parse(data)
    }).catch(() => {
      this.persist()
    })
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database))
  }

  select(table, data){
    const result = this.database[table] ?? []

    if (result.length > 0 && data !== null) {
      const talksFilter = result.find((talks) => talks.title === data.title || talks.description === data.description)
      return talksFilter
    } else {
      return result
    }
  }

  insert(table, data){
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data)
    }else{
      this.database[table] = [data]
    }
    this.persist()
  }

  update(table, id, data){
    const result = this.database[table].find(talk => talk.id === id)

    if(result) {
      result.title = data.title ? data.title : result.title
      result.description = data.description ? data.description : result.description
    }
    this.persist()
  }
  alterar_completed(table, id, data){
    const result = this.database[table].find(talk => talk.id === id)

    if(result) {
      result.completed_at = data.completed ? data.completed : result.completed_at
    }
    this.persist()
  }
  
  
  delete(table, id) {
    const result = this.database[table].find(talk => talk.id === id)

    if(result) {
      const removeTalks = this.database[table].filter(item => item !== result)
      console.log(removeTalks)
      this.database[table] = removeTalks
    }
    this.persist()
  }
}

