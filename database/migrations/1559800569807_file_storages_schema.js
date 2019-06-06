'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileStoragesSchema extends Schema {
  up () {
    this.create('file_storages', (table) => {
      table.increments()
      table.string('storage_path').notNullable()
      table.string('name').notNullable()
      table.string('client_name').notNullable()
      table.string('extension').notNullable()
      table.string('type').notNullable()
      table.integer('size').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.drop('file_storages')
  }
}

module.exports = FileStoragesSchema
