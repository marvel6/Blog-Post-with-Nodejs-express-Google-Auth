const express = require('express')
const router = express.Router()

const {ensureAuth} = require('../middleware/authMiddleware')

const {addBlog,writeSomeBlog,getAllBlogs,editIconBtn,updateBlog,deleteBlog,readStory,showPersonalStories } = require('../controller/addBlogs')

router.route('/add').get(ensureAuth,addBlog)
router.route('/').post(ensureAuth,writeSomeBlog)
router.route('/').get(ensureAuth,getAllBlogs)
router.route('/edit/:id').get(ensureAuth,editIconBtn)
router.route('/:id').put(ensureAuth,updateBlog)
router.route('/:id').delete(ensureAuth,deleteBlog)
router.route('/:id').get(ensureAuth,readStory)
router.route('/user/:userId').get(ensureAuth,showPersonalStories )




module.exports = router