import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import faker from 'faker'

export default class MainSeeder extends BaseSeeder {
  public async run () {
    await User.truncate()

    await User.createMany([
      { username: 'admin', email: 'admin@example.com', password: 'admin', active: true },
      { username: 'user1', email: 'user1@example.com', password: 'user1', active: true },
      { username: 'user2', email: 'user2@example.com', password: 'user2', birth: DateTime.fromJSDate(new Date) },
      { username: 'user3', email: 'user3@example.com', password: 'user3', birth: DateTime.fromJSDate(faker.date.recent(200))},
    ])

    for (let i = 0; i < 50; i++) {
      const user = new User
      user.username = faker.internet.userName()
      user.email = faker.internet.exampleEmail(user.username)
      user.password = faker.internet.password(8)
      user.active = faker.random.boolean()
      user.birth = DateTime.fromJSDate(faker.date.past(20))
      await user.save()
    }
  }
}
