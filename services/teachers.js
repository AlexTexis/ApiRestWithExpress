const mongoLib = require('../lib/mongo')


class Teachers 
{
  constructor()
  {
    this.mongo = new mongoLib()
    this.collection = "maestros"
  }

  async getTeachers({tags})
  {
    const query = tags && {tags : {$in : tags}}
    const teachers = await this.mongo.getAll(this.collection,query)
    return teachers || []
  }

  async getOnlyTeacher({id})
  {
      const teacher = await this.mongo.getItem(this.collection,id)
      return teacher
  }

  async createTeacher({body})
  {
    const createTeacher = await this.mongo.createItem(this.collection,body)
    return createTeacher
  }
}

module.exports = Teachers