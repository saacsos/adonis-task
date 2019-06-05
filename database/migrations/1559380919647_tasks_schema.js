'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.boolean('is_completed').notNullable().defaultTo(false)
      table.text('detail').nullable()
      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema

