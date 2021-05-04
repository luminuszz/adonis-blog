import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import Post from './Post'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Post)
  public posts: ManyToMany<typeof Post>

  @beforeCreate()
  public static async generateUUID(tag: Tag) {
    tag.id = v4()
  }
}
