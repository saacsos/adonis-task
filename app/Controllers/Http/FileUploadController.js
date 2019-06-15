'use strict'

const Helpers = use('Helpers')
const Drive = use('Drive')
const { validate } = use('Validator')
const FileStorage = use('App/Models/FileStorage')

class FileUploadController {

    async index ({ view }) {
        const files = await FileStorage.all()
        return view.render('fileupload.index', { files: files.toJSON() })
    }

    async show ({ params, response }) {
        const name = params.path + '/' + params.name
        const found = await Drive.exists(name)
        if (!found) {
            return response.notFound()
        }
        const fs = await FileStorage.query()
                            .where('storage_path', params.path)
                            .where('name', params.name)
                            .fetch()
        const fs0 = fs.toJSON()[0]

        if (fs === undefined) {
            return response.notFound()
        }

        const file = await Drive.get(name)
        response.header('Content-Type', fs0.type)
        response.send(file)
    }

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

        const clientName = uploadedFile.clientName  // ex: filename.jpg
        const extname = uploadedFile.extname        // ex: jpg
        const size = uploadedFile.size
        const type = uploadedFile.type
        const subtype = uploadedFile.subtype
        const storagePath = 'uploads'
        const name = `${new Date().getTime()}.${extname}`

        await uploadedFile.move(Helpers.appRoot() + '/storage/' + storagePath, {
            name: name,
            overwrite: true
        })        

        if (!uploadedFile.moved()) {
            session.withErrors(uploadedFile.error())
                    .flashAll()

            return response.redirect('back')
        }

        const fs = new FileStorage()
        fs.client_name = clientName
        fs.storage_path = storagePath
        fs.name = name
        fs.type = type + '/' + subtype
        fs.extension = extname
        fs.size= size   

        await fs.save()

        return response.redirect('/files')

    }

    async destroy ( { params, session, response } ) {
        const fs = await FileStorage.find(params.id)

        const name = fs.name
        await fs.delete()  // delete from table
        // console.log(fs.toJSON());


      
        session.flash({ notification: `File "${name}" deleted!` })
      
        return response.redirect('/files')
    }
}

module.exports = FileUploadController
