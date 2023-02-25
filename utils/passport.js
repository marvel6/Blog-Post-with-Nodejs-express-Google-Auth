const googleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/User')

module.exports = (passport) =>{
    passport.use(new googleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'

    }, async(accessToken,refreshToken,profile,done)=>{
      
        const newUser = {
            cloudId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            image:profile.photos[0].value
        }
        
        try {
         const checkUser = await User.findOne({cloudId:profile.id})

         if(checkUser){
            done(null,checkUser)
         }else{
            const user = await User.create(newUser)
            done(null,checkUser)
         }
            
        } catch (error) {
            console.error(error.message)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id); 
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => done(err, user));
    });
}