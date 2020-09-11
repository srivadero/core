import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthLoginValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    uid: schema.string({ trim: true }, [
      rules.regex(/^[a-zA-Z0-9_]+$/),
      rules.maxLength(100),
      rules.email(),
    ]),
    password: schema.string({ trim: true }, [
      rules.maxLength(100),
    ]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'uid.required': 'Valor requerido',
    'password.required': 'Valor requerido',
  }
}
