'use strict'

class UserController {
    async login ({ auth, request }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)

        return response.redirect('/profile')
    }

    async profile ({ auth, view }) {
        return view.render('users.index')
    }
}

module.exports = UserController
