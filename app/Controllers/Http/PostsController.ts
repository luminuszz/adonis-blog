import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async store({ request }: HttpContextContract) {
    const parsedPost = await request.validate(CreatePostValidator)

    const createdPost = await Post.create(parsedPost)

    return createdPost
  }

  public async index({ auth }: HttpContextContract) {
    return {
      posts: await Post.query().preload('author'),
      loggedUser: auth.user?.updatedAt,
    }
  }
}
