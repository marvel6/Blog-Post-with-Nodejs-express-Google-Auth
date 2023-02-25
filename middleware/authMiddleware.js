module.exports = {
    ensureAuth:(req,res,next) =>{
        if(!req.isAuthenticated()) return res.redirect('/')
        next()

    },

    ensureGuest:(req,res,next) =>{
       if(req.isAuthenticated()) return res.redirect('/dashboard')
       next()
    }
}