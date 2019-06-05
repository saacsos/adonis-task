'use strict'

const Persona = use('Persona')

class UserController {
    async register ({ request, session, response }) {
        const payload = request.only(['email', 'password', 'password_confirmation'])
        const email = request.input('email')

        const user = await Persona.register(payload)

        session.flash({ notification: `Email "${email}" has been registered!` })

        return response.redirect('/login')
    }

    async login ({ auth, request, response }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)

        return response.redirect('/profile')
    }

    async profile ({ view }) {
        return view.render('users.profile')
    }

    async logout ({ auth, response }) {
        await auth.logout()
        return response.redirect('/')
    }
}

module.exports = UserController
