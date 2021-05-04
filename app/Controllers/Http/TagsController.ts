import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import CreateTagValidator from 'App/Validators/CreateTagValidator'

export default class TagsController {
  public async store({ request }: HttpContextContract) {
    const parsedTag = await request.validate(CreateTagValidator)

    const createdTag = await Tag.create(parsedTag)

    return createdTag
  }

  public async index() {
    return await Tag.query().preload('posts')
  }
}
