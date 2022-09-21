// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const { default: axios } = require('axios');
const methodOverride = require('method-override')

console.log('server secret:', process.env.ENC_SECRET)

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3001
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));
// our custom auth middleware
app.use(async (req, res, next) => {
    // console.log('hello from a middleware 👋')
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        // decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user on the res.locals
        res.locals.user = user
    // if there is no cookie -- set the user to be null in the res.locals
    } else {
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})

// route definitions
app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/aboutus', (req, res) => {
    res.render('about.ejs')
})
app.get('/results', (req, res) => {
        axios.get(`http://www.omdbapi.com/?s=${req.query.movieSearch}&apikey=${process.env.API_KEY}`)
          .then(response => {
            res.render('results.ejs', { movies: response.data.Search })
          })
          .catch(console.log)
      })
      
      app.get('/details/:id', (req, res) => {
        console.log(req.params.id)
        axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`)
          .then(response => {
            res.render('detail.ejs', { movie: response.data })
          })
          .catch(console.log)
      })

// GET /FAVES -- Read all faves and display them to the user
app.get('/favorites', async (req, res) => {
    try {
      const user = await db.user.findOne({
        where: { email: res.locals.user.email }

     })
        const userFaves = await user.getFaves()
        
        const allComments = await db.comment.findAll()

      res.render('faves.ejs', { userFaves, allComments})
    } catch(err) {
      console.log(err)
      res.send('server error')
    }
  })
// POST /faves -- CREATE new fave and redirect to /faves to display user faves
app.post('/favorites', async (req,res) => {
    try {
        const [fave, faveCreated] = await db.fave.findOrCreate({
            where: {
                title: req.body.title,
                imdbid: req.body.imdbid,
                poster: req.body.poster
            }
        })
        const user = await db.user.findOne({
            where: {
                email: res.locals.user.email
            }
        })
        await user.addFave(fave)
      res.redirect('/favorites', )
    } catch(err) {
      console.log(err)
      res.send('server error')
    }
  })
// delete faves
app.delete('/favorites/:id', async (req,res) => {
    try {

        const deleteUserFaves = await db.fave.destroy({
            where: { id: req.params.id }
        })
       
        res.redirect('/favorites')
    } catch(err){
        console.log(err)
    }
})
// comments
app.post('/favorites/:id', async (req,res) => {
    try {
        const [comment, commentCreated] = await db.comment.findOrCreate({
        
        where:{
            user_name: req.body.user_name,
            content: req.body.content,
            faveId: req.params.id,
            userId: res.locals.user.id
        }
            
        })
        res.redirect('/favorites')
    } catch(err){
        console.log(err)
    }
})
// delete comments
app.delete('/favorites/:id', async (req,res) => {
  try {

       const grabUser = await db.user.findOne({
          where: { email: res.locals.user.email }
      })
      // once you set on your action <%= comment.id %> the id on your rout changes to that!
      const deleteComment = await db.comment.destroy({
          where: { commentId: req.params.id,
                   userId: grabUser.id}

      })
     
      res.redirect('/favorites')
  } catch(err){
      console.log(err)
  }
})
// Controllers
app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => console.log(`you or your loved ones may be entitled to compensation on port: ${PORT}`))