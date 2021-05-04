import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Tag from 'App/Models/Tag'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
  public async store({ request }: HttpContextContract) {
    const parsedPost = await request.validate(CreatePostValidator)

    const createdPost = await Post.create(parsedPost)

    return createdPost
  }

  public async index({ auth }: HttpContextContract) {
    return {
      posts: await Post.query().preload('author').preload('tags'),
      loggedUser: auth.user?.updatedAt,
    }
  }

  public async addTagInPost({ request }: HttpContextContract) {
    const data = request.only(['tagId', 'postId'])

    const foundedPost = await Post.findOrFail(data.postId)

    const foundedTag = await Tag.findOrFail(data.tagId)

    foundedPost.related('tags').save(foundedTag)
  }
}
