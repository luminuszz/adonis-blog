import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const parsedUser = await request.validate(CreateUserValidator)

    const createdUser = await User.create(parsedUser)

    return createdUser
  }

  public async index({}: HttpContextContract) {
    return await User.query().preload('posts')
  }
}
