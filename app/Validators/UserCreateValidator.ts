import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserCreateValidator {
  constructor(private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.regex(/^[a-zA-Z0-9_]+$/),
      rules.maxLength(40),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.maxLength(100),]),
    active: schema.boolean.optional(),
    birth: schema.date.optional({ format: 'd/L/yyyy' })
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
