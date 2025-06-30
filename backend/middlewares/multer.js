import multer from 'multer' 

// create multer middleware for parsing formdata
const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null , `${Date.now()}_${file.originalname}`)
    },

    destination: function (req, file, cb) {
        cb(null, 'uploads/') // ✅ store in clean folder
    },
})

const upload = multer({storage})
// parsing formdata to express to use this middlewate

export default upload