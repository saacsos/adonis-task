'use strict'

const Helpers = use('Helpers')
const { validate } = use('Validator')

class FileUploadController {

    async create ({ view }) {
        return view.render('fileupload.create')
    }

    async store ({ request, session, response }) {
        const uploadedFile = request.file('upload_file', {
            types: ['image'],
            size: '2mb'
        })

        if (uploadedFile === null) {
            session.withErrors({ message: 'File is empty'})
                    .flashAll()
            return response.redirect('back')
        }

        await uploadedFile.move(Helpers.tmpPath('uploads'), {
            name: 'custom-name.jpg',
            overwrite: true
        })

        

        if (!uploadedFile.moved()) {
            session.withErrors(uploadedFile.error())
                    .flashAll()

            return response.redirect('back')
        }

        return 'File moved'

    }
}

module.exports = FileUploadController
