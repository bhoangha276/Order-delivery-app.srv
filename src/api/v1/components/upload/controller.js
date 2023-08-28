const { initializeApp } = require('firebase/app')
const {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} = require('firebase/storage')
const config = require('../../config')

const HttpError = require('../../utilities/httpError')

const uploadToDisk = (req, res) => {
    res.send({
        success: 1,
        data: req.file.path,
    })
}

const app = initializeApp(config.Firebase)
const firebaseStorage = getStorage(app)

const buildFileName = (originalname) => {
    const ext = originalname.split('.').pop()
    const fileName = originalname.substring(0, originalname.indexOf(ext) - 1)

    return `${fileName}-${Date.now()}.${ext}`
}

// Check type of file
const whiteList = ['jpg', 'png', 'jfif', 'jpeg']
const preventUploadFileType = (originalname) => {
    const ext = originalname.split('.').pop()

    if (!whiteList.includes(ext)) {
        throw new HttpError('Not support file type!', 400)
    }
}

const uploadToCloud = async (req, res) => {
    const file = req.file

    const { buffer, originalname, mimetype } = file

    preventUploadFileType(originalname)

    const imageRef = ref(firebaseStorage, buildFileName(originalname))
    const data = await uploadBytes(imageRef, buffer, {
        contentType: mimetype,
    })

    const downloadUrl = await getDownloadURL(data.ref)

    res.send({
        success: 1,
        data: downloadUrl,
    })
}

module.exports = {
    uploadToDisk,
    uploadToCloud,
}
