const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const db = require('./db')

const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })

const app = express()
const PORT = process.env.PORT || 5000

// logging middleware
app.use(morgan('dev'))

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// compression middleware
app.use(compression())

// passport registration

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', '/client/public')))

// // any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
//   } else {
//     next()
//   }
// })
// // sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', '/client/public/index.html'))
// })

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// for deployment only
if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')))

  // handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

// sync db and run app
db.sync()
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = app
