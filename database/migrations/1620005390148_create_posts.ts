import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatePosts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.uuid('author_id')
      table.text('content', 'longtext').notNullable()
      table.timestamps(true)

      table.foreign('author_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
