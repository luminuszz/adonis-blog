import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostTags extends BaseSchema {
  protected tableName = 'post_tag'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('post_id')
      table.uuid('tag_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
