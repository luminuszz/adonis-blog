import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required()]),
    lastName: schema.string({ trim: true }, [rules.required()]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.required(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),

    password: schema.string({}, [rules.required(), rules.confirmed()]),
  })

  public messages = {}
}
