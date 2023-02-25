
const Stories = require('../model/Blogs')

const login = async (req, res) => {
    res.render('login', {
        layout: 'login'
    })
}


const dashboard = async (req, res) => {

    try {
        const stories = await Stories.find({ user: req.user.id }).lean()  /*when I was developing I mistakingly did fineOne 🤣🤣, I had problems for days, so 
        I had to comment it
        */


        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })


    } catch (error) {
        console.log(error)

        res.render('/error/500')
    }


}









module.exports = {
    login,
    dashboard,
}