import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

class UserCreateValidator {
  constructor(private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      // rules.alpha(),
      rules.maxLength(40),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.confirmed(),
    ]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'username.required': 'No puede estar vacio',
    'username.maxLength': 'Maximo 30 caracteres',
    'username.unique': 'El nombre ya esta en uso',
    'email.required': 'No puede estar vacio',
    'email.maxLength': 'Maximo 100 caracteres',
    'email.email': 'No es un mail valido',
    'email.unique': 'El correo ya esta en uso',
    'password.required': 'No puede estar vacio',
    'password.maxLength': 'Maximo 100 caracteres',
    'password.confirmed': 'La contraseña no coincide',
  }
}

export default class AuthController {
  async registerForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  async register({ auth, request, response }: HttpContextContract) {
    const userDetails = await request.validate(UserCreateValidator)
    const user = new User()
    user.merge(userDetails)
    await user.save()

    await auth.login(user)
    response.redirect('/')
  }

  async loginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('uid')
    const password = request.input('password')
    await auth.attempt(email, password)

    response.redirect('/')
  }

  async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
  }

  async profile({ auth, view }: HttpContextContract) {
    return view.render('auth/profile', { user: auth.user })
  }
}
