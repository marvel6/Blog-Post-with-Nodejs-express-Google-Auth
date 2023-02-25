
const Story = require('../model/Blogs')

const addBlog = async (req, res) => {
    res.render('stories/add')
}



const writeSomeBlog = async (req, res) => {

    try {
        req.body.user = req.user.id

        await Story.create(req.body)

        res.redirect('/dashboard')

    } catch (error) {
        console.log(error)

        res.render('/errors/500')
    }
}




const getAllBlogs = async (req, res) => {
    try {
        const Stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()


        res.render('stories/index', {
            Stories
        })

    } catch (error) {


    }


}

const editIconBtn = async (req, res) => {

    const Stories = await Story.findOne({ _id: req.params.id }).lean()

    if (!Story) {
        res.render('error/404')
    }

    if (Stories.user != req.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', {
            Stories
        })
    }

}


const readStory = async (req, res) => {

    try {
        const story = await Story.findById(req.params.id)
         .populate('user')
         .lean()


        if (!story) {
            res.render('error/404')
        }

        res.render('stories/show', {
            story
        })

    } catch (error) {
        res.render('error/404')

    }

}


const showPersonalStories = async (req, res) => {
    try {
        const Stories = await Story.find({
            user: req.params.userId,
            status: 'public'

        })
            .populate('user')
            .lean()

        res.render('stories/index', {
            Stories
        })

    } catch (err) {
        console.log(err)

        res.render('error/404')
    }
}


const updateBlog = async (req, res) => {
    let story = await Story.findById(req.params.id)

    if (!story) {
        res.render('error/404')
    }

    if (story.user != req.user.id) {
        res.redirect('/stories')
    } else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        res.redirect('/dashboard')

    }
}


const deleteBlog = async (req, res) => {
    let story = await Story.findById(req.params.id)

    if (!story) {
        res.render('error/404')
    }

    if (story.user != req.user.id) {
        redirect('/stories')
    } else {

        await story.remove()

        res.redirect('/dashboard')

    }
}




module.exports = {
    addBlog,
    writeSomeBlog,
    getAllBlogs,
    editIconBtn,
    updateBlog,
    deleteBlog,
    readStory,
    showPersonalStories
}