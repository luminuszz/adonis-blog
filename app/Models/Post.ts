import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from './User'
import Tag from './Tag'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public content: string

  @column({
    columnName: 'author_id',
    serializeAs: 'authorId',
  })
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  author: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    localKey: 'id',
    pivotForeignKey: 'post_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
  })
  public tags: ManyToMany<typeof Tag>

  @beforeCreate()
  public static async generateUUID(post: Post) {
    post.id = v4()
  }
}
