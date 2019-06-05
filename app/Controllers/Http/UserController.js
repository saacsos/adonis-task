'use strict'

class UserController {
    async login ({ auth, request }) {
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
