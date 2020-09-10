import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
  'NOT_IMPLEMENTED' = 'Operacion no implementada'
}

export default class UsersController {

  public async index({ request, view }: HttpContextContract) {
    const page = request.get().page || 1
    const pagination = await User.query()
      .orderBy('username', 'asc')
      .paginate(page, 10)
    const users = pagination.all()
    return view.render('user/index', { users, pagination: pagination.getMeta() })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('user/create')
  }

  public async store({ response, session }: HttpContextContract) {
    console.log('User.store no implementado')
    //   const data = await request.validate(UserValidator)
    //   const user = new User
    //   user.merge(data)
    //   await user.save()
    session.flash({ error: Message.NOT_IMPLEMENTED })
    return response.redirect().toRoute('user.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('user.index')
    }
    return view.render('user/edit', { user })
  }

  public async update({ response, session }: HttpContextContract) {
    console.log('User.update no implementado')
    //   console.log('UPDATE')
    //   const data = await request.validate(UserValidator)
    //   const user = await User.find(params.id)
    //   user?.merge(data)
    //   await user?.save()
    // session.flash(user ? { success: Message.UPDATED } : { error: Message.NOT_FOUND })
    session.flash({ error: Message.NOT_IMPLEMENTED })
    return response.redirect().toRoute('user.index')
  }

  public async show({ response }: HttpContextContract) {
    console.log('User.show no implementado')
    return response.redirect().toRoute('user.index')
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('User.destroy no implementado')
    return response.redirect().toRoute('user.index')
  }

}
