const newsRouter = require('./news')
const coursesRouter = require('./courses')
const siteRouter = require('./site')
const userRouter = require('./user')

function route(app) {
  app.use('/news', newsRouter)
  app.use('/user', userRouter)
  app.use('/courses', coursesRouter)
  app.use('/', siteRouter)
}

module.exports = route
