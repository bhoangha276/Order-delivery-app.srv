const router = require('express').Router()
const uploadController = require('./controller')

const multer = require('multer')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },

    filename: function (req, file, cb) {
        console.log(file)
        // xử lý chỗ filename => để không bị up đè
        // xử lý chỉ upload ảnh
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: diskStorage })

const memoryStorage = multer.memoryStorage()
const uploadWithMemory = multer({ storage: memoryStorage })

// dù multer cung cấp upload nhiều ảnh
// api chỉ lên upload 1 ảnh
// client muốn upload nhiều ảnh => gọi nhiều api

router.post('/disk', upload.single('file'), uploadController.uploadToDisk)

router.post(
    '/cloud',
    uploadWithMemory.single('file'),
    uploadController.uploadToCloud
)
module.exports = router
