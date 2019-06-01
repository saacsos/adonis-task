'use strict'

// reference Task model
const Task = use('App/Models/Task')
// reference Validator
const { validate } = use('Validator')

class TaskController {
    async index({ view }) {
        const tasks = await Task.all()

        return view.render('tasks.index', { tasks: tasks.toJSON() })
    }

    async store({ request, response, session }) {
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            detail: 'max:512'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
                    .flashAll()
            return response.redirect('back')
        }

        const task = new Task()
        task.title = request.input('title')
        task.detail = request.input('detail')
        await task.save()

        session.flash({
            notification: 'Task ' + '"' + task.title + '" added!'
        })

        return response.redirect('back')
    }

    async destroy( {params, session, response} ) {
        const task = await Task.find(params.id)
        const title = task.title
        await task.delete()
      
        session.flash({ notification: `Task "${title}" deleted!` })
      
        return response.redirect('back')
    }
}

module.exports = TaskController
