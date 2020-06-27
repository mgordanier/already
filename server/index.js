const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const db = require('./db/db')
const app = express()
const PORT = process.env.PORT || 5000

// logging middleware
app.use(morgan('dev'))

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// compression middleware
app.use(compression())

// // routes
// app.use('/api', require('./api'))

// SERVER TEST ROUTES
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req, res) => {
  console.log(req.body)
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  )
})

// // static file-serving middleware
// app.use(express.static(path.join(__dirname, '..', 'public')))

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
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
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
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// sync db and run app
db.sync()
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = app
