const express = require('express')
const passport = require('passport')

const router = express.Router()



router.route('/google').get(passport.authenticate('google', { scope: ['profile'] }))

router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/', successRedirect: '/dashboard' }))


router.get('/logout',(req,res,next)=>{
    req.logout((err) =>{
        if(err) next(err)
        res.redirect('/')
    })
})



module.exports = router
