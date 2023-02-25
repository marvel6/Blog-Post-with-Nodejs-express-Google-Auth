require('dotenv').config()
require('express-async-error')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const morgan = require('morgan')
const exhb = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')


const connectDb = require('./connectDb/connect')
const router = require('./routes/index')
const googleRoute = require('./routes/google')
const blogRoute = require('./routes/stories')


const port = process.env.PORT || 5000


app.use(express.static('./public'))

require('./utils/passport')(passport)

const {formatDate,truncate,replace,editIcon,select} = require('./DateFormater/formatblog')


if (process.env.NODE_ENV === "development") {

  app.use(morgan('dev'))
}


app.engine('.hbs', exhb.engine({ helpers:{
  formatDate,
  truncate,
  replace,
  editIcon,
  select
},defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(methodOverride((req,res)=>{

  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    let method = req.body._method
    delete req.body._method
    return method
  }
}))





app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:process.env.MONGO_URI})
}))


app.use(passport.initialize())
app.use(passport.session())

//acessing the req.user 


app.use((req,res,next) => {
  res.locals.user = req.user
  next()
})



app.use('/', router)
app.use('/auth', googleRoute)
app.use('/stories',blogRoute)


const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)

    
  } catch (error) {
   console.log(error)
  }
}

start().then(()=>{
  app.listen(port, () => console.log(`App is listening on port ${port}`))
})

//"mongodb://0.0.0.0:27017/MTU_BLOG_360"




