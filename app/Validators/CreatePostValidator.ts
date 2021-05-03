import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.required()]),
    content: schema.string({ trim: true }, [rules.required()]),
    authorId: schema.string({}, [
      rules.required(),
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
  })

  public messages = {}
}
