const Datastore = require('nedb-promises')
let db = {}
db.posts = Datastore.create('database/posts')
db.comments = Datastore.create('database/comments')
db.posts.load()
db.comments.load()

module.exports = db