const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CoursesController {
  //[GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) })
      })
      .catch(next)
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create')
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body
    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARgfIFoocjAP&rs=AOn4CLDvujWE53ju3Aap8KgwZjJPQ4AVIQ`
    const course = new Course(req.body)
    course
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => {})
  }

  //[POST] /courses/_id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', {
          course: mongooseToObject(course),
        }),
      )
      .catch(next)
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/user/stored/courses'))
      .catch(next)
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('/user/trash/courses'))
      .catch(next)
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}

module.exports = new CoursesController()
