import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public active?: boolean

  @column()
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime()
  public birth?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static usernameContains = scope((query, text: string) => {
    if(!text) return
    query.orWhere('username', 'LIKE', '%' + text.trim() + '%')
    query.orWhere('email', 'LIKE', '%' + text.trim() + '%')
  })

}
