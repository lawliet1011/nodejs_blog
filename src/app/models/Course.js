const mongoose = require('mongoose')
// const slug = require('mongoose-slug-generator')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema

const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
)

Course.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
})

module.exports = mongoose.model('Course', Course)
