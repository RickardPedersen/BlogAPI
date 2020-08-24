const Datastore = require('nedb-promises')
let db = {}
db.posts = Datastore.create('server/database/posts')
db.comments = Datastore.create('server/database/comments')
db.posts.load()
db.comments.load()

module.exports = db