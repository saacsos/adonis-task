'use strict'

class SampleController {
    async store({ request }) {
        return request.all()
    }
}

module.exports = SampleController
